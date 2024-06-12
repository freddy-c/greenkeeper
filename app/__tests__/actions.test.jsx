import path from "path";
import {
    createManufacturer,
    deleteManufacturer,
    createItem,
    createProduct,
} from "../actions";
import { prismaMock } from "../singleton";

jest.mock("next/cache", () => ({
    __esModule: true,
    revalidatePath: jest.fn(() => null),
}));

describe("createManufacturer", () => {
    test("should return issues if schema validation fails", async () => {
        const invalidData = {
            name: "", // name should have minimum length of 1
        }; // Provide invalid data based on your schema
        const result = await createManufacturer(invalidData);

        expect(result.success).toBe(false);
        expect(result.issues).toEqual([
            {
                path: ["name"],
                message: "String must contain at least 1 character(s)",
            },
        ]);
    });

    test("should return issues if the name is already in use", async () => {
        const validData = { name: "Test Manufacturer" }; // Provide valid data based on your schema
        const mockData = { id: "1", name: "Test Manufacturer" };

        // Mock existing manufacturer
        prismaMock.manufacturer.findMany.mockResolvedValue([mockData]);

        const result = await createManufacturer(validData);

        expect(result.success).toBe(false);
        expect(result.issues).toEqual([
            {
                path: ["name"],
                message: "This name is already in use",
            },
        ]);
    });
    test("should create a new manufacturer if the data is valid and the name is not in use", async () => {
        const validData = { name: "New Manufacturer" }; // Provide valid data based on your schema
        const mockData = { id: "1", name: "New Manufacturer" };

        prismaMock.manufacturer.findMany.mockResolvedValue([]); // Mock no existing manufacturer
        prismaMock.manufacturer.create.mockResolvedValue(mockData); // Mock successful creation

        const result = await createManufacturer(validData);

        expect(result.success).toBe(true);
        expect(result.manufacturer).toEqual(mockData);
    });
    test("should handle errors during manufacturer creation", async () => {
        const validData = { name: "New Manufacturer" }; // Provide valid data based on your schema

        prismaMock.manufacturer.findMany.mockResolvedValue([]); // Mock no existing manufacturer
        prismaMock.manufacturer.create.mockRejectedValue(
            new Error("Creation failed")
        ); // Mock creation failure

        const result = await createManufacturer(validData);

        expect(result.success).toBe(false);
    });
});

describe("deleteManufacturer", () => {
    test("should return an error if id validation fails", async () => {
        const invalidData = new FormData();
        invalidData.set("id", "invalid-id"); // Invalid format

        const result = await deleteManufacturer({ message: "" }, invalidData);

        expect(result.message).toBe("Failed to delete manufacturer");
    });

    test("should return an error if manufacturer deletion fails", async () => {
        const validData = new FormData();
        validData.set("id", "056a6f07-533b-4512-9460-b9eaf35b96b9");

        prismaMock.manufacturer.delete.mockRejectedValue(
            new Error("Deletion failed")
        );

        const result = await deleteManufacturer({ message: "" }, validData);

        expect(result.message).toBe("Failed to delete manufacturer");
    });

    test("should delete the manufacturer and return a success message", async () => {
        const validData = new FormData();
        validData.set("id", "056a6f07-533b-4512-9460-b9eaf35b96b9");

        prismaMock.manufacturer.delete.mockResolvedValue({
            id: "056a6f07-533b-4512-9460-b9eaf35b96b9",
            name: "Test Manufacturer",
        }); // Mock successful deletion

        const result = await deleteManufacturer({ message: "" }, validData);

        expect(result.message).toBe(
            `Deleted manufacturer with id: 056a6f07-533b-4512-9460-b9eaf35b96b9`
        );
    });
});

describe("createItem", () => {
    test("should return issues if schema validation fails", async () => {
        const invalidData = {
            // assuming required fields are missing or incorrect
            product: {
                value: "a34fe847-ad2b-4ee8-aced-14eaff68bb0b",
                label: "H2Pro Trismart",
            },
            distributor: {
                value: "5c3c991d-f26f-4e52-bd1b-ad6c221c6dcf",
                label: "Collier Turf Care",
            },
            price: -10,
            purchaseDate: "invalid-date",
            initialQuantity: -1,
            currentQuantity: -1,
        };
        const result = await createItem(invalidData);

        expect(result.success).toBe(false);
        expect(result.issues.length).toBeGreaterThan(0);
    });

    test("should create a new item if the data is valid", async () => {
        const validData = {
            product: {
                value: "a34fe847-ad2b-4ee8-aced-14eaff68bb0b",
                label: "H2Pro Trismart",
            },
            distributor: {
                value: "5c3c991d-f26f-4e52-bd1b-ad6c221c6dcf",
                label: "Collier Turf Care",
            },
            price: 100,
            purchaseDate: "2023-01-01",
            initialQuantity: 10,
            currentQuantity: 10,
        };
        const mockData = {
            id: "1",
            ...validData,
            purchaseDate: new Date(validData.purchaseDate),
        };

        prismaMock.item.create.mockResolvedValue(mockData);

        const result = await createItem(validData);

        expect(result.success).toBe(true);
        expect(result.item).toEqual(mockData);
    });

    test("should handle errors during item creation", async () => {
        const validData = {
            product: {
                value: "a34fe847-ad2b-4ee8-aced-14eaff68bb0b",
                label: "H2Pro Trismart",
            },
            distributor: {
                value: "5c3c991d-f26f-4e52-bd1b-ad6c221c6dcf",
                label: "Collier Turf Care",
            },
            price: 100,
            purchaseDate: "2023-01-01",
            initialQuantity: 10,
            currentQuantity: 10,
        };

        prismaMock.item.create.mockRejectedValue(new Error("Creation failed"));

        const result = await createItem(validData);

        expect(result.success).toBe(false);
    });
});

describe("createProduct", () => {
    test("should return issues if schema validation fails", async () => {
        const invalidData = {
            name: "", // name should have minimum length of 1
            manufacturer: { value: "", label: "" }, // manufacturer ID is missing
        };
        const result = await createProduct(invalidData);

        expect(result.success).toBe(false);
        expect(result.issues).toEqual([
            { path: ["name"], message: "Product name is required" },
            { path: ["manufacturer", "value"], message: "Invalid uuid" },
        ]);
    });

    test("should create a new product if the data is valid", async () => {
        const validData = {
            name: "New Product",
            manufacturer: {
                value: "5b2aec59-6823-410d-b595-46b770584c56",
                label: "Aquatrols",
            },
        };
        const mockData = {
            id: "1",
            name: "New Product",
            manufacturerId: "5b2aec59-6823-410d-b595-46b770584c56",
        };

        prismaMock.product.create.mockResolvedValue(mockData);

        const result = await createProduct(validData);

        expect(result.success).toBe(true);
        expect(result.product).toEqual(mockData);
    });

    test("should handle errors during product creation", async () => {
        const validData = {
            name: "New Product",
            manufacturer: {
                value: "5b2aec59-6823-410d-b595-46b770584c56",
                label: "Aquatrols",
            },
        };

        prismaMock.product.create.mockRejectedValue(
            new Error("Creation failed")
        );

        const result = await createProduct(validData);

        expect(result.success).toBe(false);
    });
});

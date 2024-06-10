import { createManufacturer, deleteManufacturer } from "../actions";
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

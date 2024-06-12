import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import AddItemForm from "../inventory/add-item-form";
import renderer from "react-test-renderer";
import SelectEvent from "react-select-event";
import { prismaMock } from "../singleton";

jest.mock("next/cache", () => ({
    __esModule: true,
    revalidatePath: jest.fn(() => null),
}));

const mockProducts = [
    {
        id: "a34fe847-ad2b-4ee8-aced-14eaff68bb0b",
        name: "H2Pro Trismart",
        manufacturerId: "e798c4f9-5e96-4bd9-be8c-8eeb126e711c",
    },
    {
        id: "604ffb92-fee8-42cf-88d7-89119375f853",
        name: "Primo Maxx II",
        manufacturerId: "e798c4f9-5e96-4bd9-be8c-8eeb126e711c",
    },
];

const mockDistributors = [
    { id: "5c3c991d-f26f-4e52-bd1b-ad6c221c6dcf", name: "Collier Turf Care" },
    { id: "3e147817-1b4a-4a91-82dc-656621b56de8", name: "Pitchcare" },
];

describe("AddItemForm", () => {
    test("renders correctly", () => {
        const tree = renderer.create(<AddItemForm />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("shows error message when form is submitted with invalid data", async () => {
        render(
            <AddItemForm
                products={mockProducts}
                distributors={mockDistributors}
            />
        );

        fireEvent.click(screen.getByRole("button", { name: /add item/i }));

        await waitFor(() => {
            expect(screen.getAllByText(/Required/i)).toHaveLength(6);
        });
    });

    // test("successfully submits form with valid data", async () => {
    //     const mockData = {
    //         id: "1",
    //         product: {
    //             id: "a34fe847-ad2b-4ee8-aced-14eaff68bb0b",
    //             name: "H2Pro Trismart",
    //         },
    //         distributor: {
    //             id: "5c3c991d-f26f-4e52-bd1b-ad6c221c6dcf",
    //             name: "Collier Turf Care",
    //         },
    //         price: 100,
    //         purchaseDate: new Date("2023-01-01"),
    //         initialQuantity: 5,
    //         currentQuantity: 5,
    //     };

    //     prismaMock.item.create.mockResolvedValue(mockData);

    //     render(
    //         <AddItemForm
    //             products={mockProducts}
    //             distributors={mockDistributors}
    //         />
    //     );

    //     await SelectEvent.select(
    //         screen.getByLabelText(/product/i),
    //         "H2Pro Trismart"
    //     );
    //     await SelectEvent.select(
    //         screen.getByLabelText(/distributor/i),
    //         "Collier Turf Care"
    //     );

    //     fireEvent.change(screen.getByLabelText("price"), {
    //         target: { value: 100 },
    //     });
    //     fireEvent.change(screen.getByLabelText("date1"), {
    //         target: { value: "2023-01-01" },
    //     });
    //     fireEvent.change(screen.getByLabelText("initialQuantity"), {
    //         target: { value: 5 },
    //     });
    //     fireEvent.change(screen.getByLabelText("currentQuantity"), {
    //         target: { value: 5 },
    //     });

    //     fireEvent.click(screen.getByRole("button", { name: /add item/i }));

    //     await waitFor(() => {
    //         // expect(screen.getByText(/Collier Turf Care/i)).toBeInTheDocument();
    //         // expect(screen.getByText(/H2Pro Trismart/i)).toBeInTheDocument();
    //         // expect(screen.getByText(/100/i)).toBeInTheDocument();
    //         // expect(screen.getByText(/2023-01-01/i)).toBeInTheDocument();
    //         // expect(screen.getAllByText(/5/i)).toHaveLength(2);
    //         // expect(screen.getByLabelText(/product/i).textContent).toBe("");

    //         expect(screen.getByLabelText(/purchase date/i).value).toBe(
    //             "2023-01-01"
    //         );
    //         expect(screen.getByLabelText(/initial quantity/i).value).toBe("5");
    //         expect(screen.getByLabelText(/current quantity/i).value).toBe("5");
    //         expect(prismaMock.item.create).toHaveBeenCalledWith({
    //             data: {
    //                 product: {
    //                     connect: {
    //                         id: mockData.product.id,
    //                     },
    //                 },
    //                 distributor: {
    //                     connect: {
    //                         id: mockData.distributor.id,
    //                     },
    //                 },
    //                 price: mockData.price,
    //                 purchaseDate: new Date(mockData.purchaseDate),
    //                 initialQuantity: mockData.initialQuantity,
    //                 currentQuantity: mockData.currentQuantity,
    //             },
    //         })
    //     });
    // });

    // test("reset form after successful submission", async () => {
    //     const mockData = {
    //         id: "1",
    //         product: {
    //             id: "a34fe847-ad2b-4ee8-aced-14eaff68bb0b",
    //             name: "H2Pro Trismart",
    //         },
    //         distributor: {
    //             id: "5c3c991d-f26f-4e52-bd1b-ad6c221c6dcf",
    //             name: "Collier Turf Care",
    //         },
    //         price: 100,
    //         purchaseDate: new Date("2023-01-01"),
    //         initialQuantity: 5,
    //         currentQuantity: 5,
    //     };

    //     prismaMock.item.create.mockResolvedValue(mockData);

    //     render(
    //         <AddItemForm
    //             products={mockProducts}
    //             distributors={mockDistributors}
    //         />
    //     );

    //     await SelectEvent.select(
    //         screen.getByLabelText(/product/i),
    //         "H2Pro Trismart"
    //     );
    //     await SelectEvent.select(
    //         screen.getByLabelText(/distributor/i),
    //         "Collier Turf Care"
    //     );

    //     fireEvent.change(screen.getByLabelText(/price/i), {
    //         target: { value: 100 },
    //     });
    //     fireEvent.change(screen.getByLabelText(/purchase date/i), {
    //         target: { value: "2023-01-01" },
    //     });
    //     fireEvent.change(screen.getByLabelText(/initial quantity/i), {
    //         target: { value: 5 },
    //     });
    //     fireEvent.change(screen.getByLabelText(/current quantity/i), {
    //         target: { value: 5 },
    //     });

    //     fireEvent.click(screen.getByRole("button", { name: /add item/i }));

    //     await waitFor(() => {
    //         expect(screen.getByLabelText(/product/i).textContent).toBe("");
    //         expect(screen.getByLabelText(/distributor/i).textContent).toBe("");
    //         expect(screen.getByLabelText(/price/i).value).toBe("");
    //         expect(screen.getByLabelText(/purchase date/i).value).toBe("");
    //         expect(screen.getByLabelText(/initial quantity/i).value).toBe("");
    //         expect(screen.getByLabelText(/current quantity/i).value).toBe("");
    //     });
    // });
});

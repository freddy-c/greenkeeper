import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import AddProductForm from "../product/add-product-form";
import SelectEvent from "react-select-event";
import { prismaMock } from "../singleton";

const mockManufacturers = [
    {
        id: "5b2aec59-6823-410d-b595-46b770584c56",
        name: "Aquatrols",
    },
    {
        id: "b6279c70-a9f6-49b9-85fb-5b01bdab7229",
        name: "Barenbrug",
    },
    {
        id: "e798c4f9-5e96-4bd9-be8c-8eeb126e711c",
        name: "ICL",
    },
];

describe("AddProductForm", () => {
    test("renders correctly", () => {
        const tree = renderer.create(<AddProductForm />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("shows error message when form is submitted with invalid data", async () => {
        render(<AddProductForm manufacturers={mockManufacturers} />);

        fireEvent.click(screen.getByRole("button", { name: /add product/i }));

        await waitFor(() => {
            expect(screen.getAllByText(/Required/i)).toHaveLength(2);
        });
    });

    test("successfully submits form with valid data", async () => {
        const mockData = {
            id: "1",
            name: "New Product",
            manufacturerId: "b6279c70-a9f6-49b9-85fb-5b01bdab7229",
        };

        prismaMock.product.create.mockResolvedValue(mockData);

        render(<AddProductForm manufacturers={mockManufacturers} />);

        fireEvent.change(screen.getByLabelText("name"), {
            target: { value: "New Product" },
        });

        await SelectEvent.select(
            screen.getByLabelText(/manufacturer/i),
            "Barenbrug"
        );

        fireEvent.click(screen.getByRole("button", { name: /add product/i }));

        await waitFor(() => {
            expect(prismaMock.product.create).toHaveBeenCalledWith({
                data: {
                    name: mockData.name,
                    manufacturer: {
                        connect: {
                            id: mockData.manufacturerId,
                        },
                    },
                },
            });
        });
    });

    // test("reset form after successful submission", async () => {
    //     const mockData = {
    //         id: "1",
    //         name: "New Product",
    //         manufacturerId: "b6279c70-a9f6-49b9-85fb-5b01bdab7229",
    //     };

    //     prismaMock.product.create.mockResolvedValue(mockData);

    //     render(<AddProductForm manufacturers={mockManufacturers} />);

    //     fireEvent.change(screen.getByLabelText("name"), {
    //         target: { value: "New Product" },
    //     });

    //     await SelectEvent.select(
    //         screen.getByLabelText(/manufacturer/i),
    //         "Barenbrug"
    //     );

    //     fireEvent.click(screen.getByRole("button", { name: /add product/i }));

    //     await waitFor(() => {
    //         expect(screen.getByLabelText("name").value).toBe("");
    //         expect(screen.getByLabelText(/manufacturer/i).value).toBe("");
    //     });
    // });

    // test("handles errors during product creation", async () => {
    //     prismaMock.product.create.mockRejectedValue(
    //         new Error("Creation failed")
    //     );

    //     render(<AddProductForm manufacturers={mockManufacturers} />);

    //     fireEvent.change(screen.getByLabelText("name"), {
    //         target: { value: "New Product" },
    //     });

    //     await SelectEvent.select(
    //         screen.getByLabelText(/manufacturer/i),
    //         "Barenbrug"
    //     );

    //     fireEvent.click(screen.getByRole("button", { name: /add product/i }));

    //     await waitFor(() => {
    //         expect(prismaMock.product.create).toHaveBeenCalled();
    //         expect(
    //             screen.getByText(/Failed to create product/i)
    //         ).toBeInTheDocument();
    //     });
    // });
});

import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import AddForm from "../add-form";
import { prismaMock } from "../singleton";

jest.mock("next/cache", () => ({
    __esModule: true,
    revalidatePath: jest.fn(() => null),
}));

describe("AddForm", () => {
    test("renders correctly", () => {
        const tree = renderer.create(<AddForm />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("shows error message when name is empty", async () => {
        render(<AddForm />);
        fireEvent.click(
            screen.getByRole("button", { name: /add manufacturer/i })
        );

        await waitFor(() => {
            expect(
                screen.getByText(/string must contain at least 1 character/i)
            ).toBeInTheDocument();
        });
    });

    test("successfully submits form with valid name", async () => {
        const validData = { name: "New Manufacturer" }; // Provide valid data based on your schema
        const mockData = { id: "1", name: "New Manufacturer" };

        prismaMock.manufacturer.findMany.mockResolvedValue([]); // Mock no existing manufacturer
        prismaMock.manufacturer.create.mockResolvedValue(mockData); // Mock successful creation

        render(<AddForm />);
        const nameInput = screen.getByLabelText(/name/i);
        fireEvent.change(nameInput, { target: { value: "Test Manufacturer" } });
        fireEvent.click(
            screen.getByRole("button", { name: /add manufacturer/i })
        );

        await waitFor(() =>
            expect(prismaMock.manufacturer.create).toHaveBeenCalledWith({
                data: {
                    name: "Test Manufacturer",
                },
            })
        );
    });

    test("resets form after successful submission", async () => {
        const mockData = { id: "1", name: "Test Manufacturer" };

        prismaMock.manufacturer.findMany.mockResolvedValue([]);
        prismaMock.manufacturer.create.mockResolvedValue(mockData); // Mock successful creation

        render(<AddForm />);
        const nameInput = screen.getByLabelText(/name/i);
        fireEvent.change(nameInput, { target: { value: "Test Manufacturer" } });
        fireEvent.click(
            screen.getByRole("button", { name: /add manufacturer/i })
        );

        await waitFor(() => {
            expect(nameInput.value).toBe("");
        });
    });

    test("shows error message for duplicate name", async () => {
        const mockData = { id: "1", name: "Test Manufacturer" };
        prismaMock.manufacturer.findMany.mockResolvedValue([mockData]);

        render(<AddForm />);
        const nameInput = screen.getByLabelText(/name/i);
        fireEvent.change(nameInput, { target: { value: "Test Manufacturer" } });
        fireEvent.click(
            screen.getByRole("button", { name: /add manufacturer/i })
        );

        await waitFor(() => {
            expect(
                screen.getByText(/This name is already in use/i)
            ).toBeInTheDocument();
        });
    });
});

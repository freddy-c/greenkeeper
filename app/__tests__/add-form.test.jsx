import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddForm from "../add-form";
import { createManufacturer } from "@/app/actions";

// Mock the createManufacturer function
jest.mock("../actions", () => ({
    createManufacturer: jest.fn(),
}));

describe("AddForm", () => {
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
        createManufacturer.mockResolvedValue({ success: true });
        render(<AddForm />);
        const nameInput = screen.getByLabelText(/name/i);
        fireEvent.change(nameInput, { target: { value: "Test Manufacturer" } });
        fireEvent.click(
            screen.getByRole("button", { name: /add manufacturer/i })
        );

        await waitFor(() =>
            expect(createManufacturer).toHaveBeenCalledWith({
                name: "Test Manufacturer",
            })
        );
    });

    // Test for form reset after successful submission (optional)
    test("resets form after successful submission", async () => {
        createManufacturer.mockResolvedValue({ success: true });
        render(<AddForm />);
        const nameInput = screen.getByLabelText(/name/i);
        fireEvent.change(nameInput, { target: { value: "Test Manufacturer" } });
        fireEvent.click(
            screen.getByRole("button", { name: /add manufacturer/i })
        );

        await waitFor(() => expect(nameInput.value).toBe(""));
    });

    test("shows error message for duplicate name", async () => {
        // Mock subsequent API call to simulate existing manufacturer
        createManufacturer.mockResolvedValueOnce({
            success: false,
            issues: [
                { path: ["name"], message: "This name is already in use" },
            ],
        });

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

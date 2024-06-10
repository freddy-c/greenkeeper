import React from "react";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import DeleteForm from "../delete-form";

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [{}, ""],
    useFormStatus: () => ({ pending: false }),
}));

const formAction = jest.fn();

describe("DeleteForm", () => {
    const manufacturerId = "123e4567-e89b-12d3-a456-426614174000";

    test("renders correctly", () => {
        const tree = renderer
            .create(<DeleteForm manufacturerId={manufacturerId} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    // test("submits the form when the submit button is clicked", () => {
    //     const { getByText } = render(
    //         <DeleteForm manufacturerId={manufacturerId} />
    //     );
    //     const deleteButton = getByText("Delete");

    //     fireEvent.click(deleteButton);

    //     // Add assertions to check the form submission behavior
    // });
});

"use client";

import { useFormState, useFormStatus } from "react-dom";
import { deleteManufacturer } from "./actions";

const initialState = {
    message: "",
};

function DeleteButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            aria-disabled={pending}
            className="border hover:cursor-pointer"
        >
            Delete
        </button>
    );
}

export default function DeleteForm({
    manufacturerId,
}: {
    manufacturerId: string;
}) {
    const [state, formAction] = useFormState(deleteManufacturer, initialState);
    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={manufacturerId} />
            <DeleteButton />
            {state.message}
        </form>
    );
}

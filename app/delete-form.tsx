"use client";

import { useFormState, useFormStatus } from "react-dom";
import { deleteManufacturer } from "./actions";

import { Button } from "@/components/ui/button";

const initialState = {
    message: "",
};

function DeleteButton() {
    const { pending } = useFormStatus();

    return (
        <div>
            <Button variant="destructive" type="submit" aria-disabled={pending}>
                Delete
            </Button>
        </div>
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

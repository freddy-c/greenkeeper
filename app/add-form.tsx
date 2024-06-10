"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createManufacturer } from "@/app/actions";

const schema = z.object({
    name: z.string().min(1).trim(),
});

export default function AddForm() {
    const {
        register,
        setError,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });
    const onSubmit = async (data: z.infer<typeof schema>) => {
        const response = await createManufacturer(data);

        if (!response.success) {
            response.issues?.forEach((issue) => {
                issue.path.forEach((pathElement: any) => {
                    setError(pathElement, {
                        type: "manual",
                        message: issue.message,
                    });
                });
            });
        } else {
            reset();
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col max-w-md space-y-4"
        >
            <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input id="name" {...register("name")} className="border" />
                {errors.name && <p>{errors.name.message}</p>}
            </div>
            <input
                type="submit"
                value="Add Manufacturer"
                className="border hover:cursor-pointer"
            />
        </form>
    );
}

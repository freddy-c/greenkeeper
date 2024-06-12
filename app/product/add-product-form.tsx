"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Manufacturer } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import { AddProductSchema } from "../schemas";
import { z } from "zod";
import { createProduct } from "../actions";
import Select from "react-select";

type AddProductFormValues = z.infer<typeof AddProductSchema>;

export default function AddProductForm({
    manufacturers,
}: {
    manufacturers: Manufacturer[];
}) {
    const {
        register,
        setError,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<AddProductFormValues>({
        resolver: zodResolver(AddProductSchema),
    });

    const onSubmit = async (data: AddProductFormValues) => {
        const response = await createProduct(data);

        if (!response.success) {
            response.issues?.forEach((issue) => {
                const pathElement = issue.path[0]; // Use only the first path element
                setError(pathElement, {
                    type: "manual",
                    message: issue.message,
                });
            });
        } else {
            reset();
        }
    };

    const manufacturerOptions = manufacturers?.map((manufacturer) => ({
        value: manufacturer.id,
        label: manufacturer.name,
    }));

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-lg mx-auto"
        >
            <div className="form-group">
                <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                >
                    Product Name
                </label>
                <input
                    {...register("name")}
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.name && (
                    <span className="text-red-500 text-sm">
                        {errors.name.message}
                    </span>
                )}
            </div>

            <div className="form-group">
                <label
                    htmlFor="manufacturer"
                    className="block text-gray-700 font-medium mb-2"
                >
                    Manufacturer
                </label>
                <Controller
                    name="manufacturer"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={manufacturerOptions}
                            placeholder="Select a manufacturer"
                            className="w-full"
                            inputId="manufacturer"
                        />
                    )}
                />
                {errors.manufacturer && (
                    <span className="text-red-500 text-sm">
                        {errors.manufacturer.message}
                    </span>
                )}
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none"
            >
                Add Product
            </button>
        </form>
    );
}

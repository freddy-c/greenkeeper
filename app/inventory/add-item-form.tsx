"use client";

import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Product, Distributor } from "@prisma/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddItemSchema } from "../schemas";
import { createItem } from "../actions";

type AddItemFormValues = z.infer<typeof AddItemSchema>;

export default function AddItemForm({
    products,
    distributors,
}: {
    products: Product[];
    distributors: Distributor[];
}) {
    const {
        register,
        setError,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<AddItemFormValues>({
        resolver: zodResolver(AddItemSchema),
    });

    const onSubmit = async (data: AddItemFormValues) => {
        const response = await createItem(data);

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

    const productOptions = products?.map((product) => ({
        value: product.id,
        label: product.name,
    }));
    const distributorOptions = distributors?.map((distributor) => ({
        value: distributor.id,
        label: distributor.name,
    }));

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-lg mx-auto"
        >
            <div className="form-group">
                <label
                    htmlFor="productOptions"
                    className="block text-gray-700 font-medium mb-2"
                >
                    Product
                </label>
                <Controller
                    name="product"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={productOptions}
                            placeholder="Select a product"
                            className="w-full"
                            inputId="productOptions"
                        />
                    )}
                />
                {errors.product && (
                    <span className="text-red-500 text-sm">
                        {errors.product.message}
                    </span>
                )}
            </div>

            <div className="form-group">
                <label
                    htmlFor="distributorOptions"
                    className="block text-gray-700 font-medium mb-2"
                >
                    Distributor
                </label>
                <Controller
                    name="distributor"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={distributorOptions}
                            placeholder="Select a distributor"
                            className="w-full"
                            inputId="distributorOptions"
                        />
                    )}
                />
                {errors.distributor && (
                    <span className="text-red-500 text-sm">
                        {errors.distributor.message}
                    </span>
                )}
            </div>

            <div className="form-group">
                <label
                    htmlFor="price"
                    className="block text-gray-700 font-medium mb-2"
                >
                    Price
                </label>
                <input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register("price", { valueAsNumber: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.price && (
                    <span className="text-red-500 text-sm">
                        {errors.price.message}
                    </span>
                )}
            </div>

            <div className="form-group">
                <label
                    htmlFor="purchaseDate"
                    className="block text-gray-700 font-medium mb-2"
                >
                    Purchase Date
                </label>
                <input
                    id="purchaseDate"
                    type="date"
                    {...register("purchaseDate")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.purchaseDate && (
                    <span className="text-red-500 text-sm">
                        {errors.purchaseDate.message}
                    </span>
                )}
            </div>

            <div className="form-group">
                <label
                    htmlFor="initialQuantity"
                    className="block text-gray-700 font-medium mb-2"
                >
                    Initial Quantity
                </label>
                <input
                    id="initialQuantity"
                    type="number"
                    step="1"
                    {...register("initialQuantity", { valueAsNumber: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.initialQuantity && (
                    <span className="text-red-500 text-sm">
                        {errors.initialQuantity.message}
                    </span>
                )}
            </div>

            <div className="form-group">
                <label
                    htmlFor="currentQuantity"
                    className="block text-gray-700 font-medium mb-2"
                >
                    Current Quantity
                </label>
                <input
                    id="currentQuantity"
                    type="number"
                    step="1"
                    {...register("currentQuantity", { valueAsNumber: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.currentQuantity && (
                    <span className="text-red-500 text-sm">
                        {errors.currentQuantity.message}
                    </span>
                )}
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none"
            >
                Add Item
            </button>
        </form>
    );
}

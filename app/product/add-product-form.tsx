"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Manufacturer } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import { AddProductSchema } from "../schemas";
import { z } from "zod";
import { createProduct } from "../actions";
import Select from "react-select";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type AddProductFormValues = z.infer<typeof AddProductSchema>;

export default function AddProductForm({
    manufacturers,
}: {
    manufacturers: Manufacturer[];
}) {
    const form = useForm<AddProductFormValues>({
        resolver: zodResolver(AddProductSchema),
    });

    const onSubmit = async (data: AddProductFormValues) => {
        const response = await createProduct(data);

        if (!response.success) {
            response.issues?.forEach((issue) => {
                const pathElement = issue.path[0]; // Use only the first path element
                form.setError(pathElement, {
                    type: "manual",
                    message: issue.message,
                });
            });
        } else {
            form.reset();
        }
    };

    const manufacturerOptions = manufacturers?.map((manufacturer) => ({
        value: manufacturer.id,
        label: manufacturer.name,
    }));

    return (
        <div className="space-y-6 max-w-lg mx-auto">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder=""
                                        {...field}
                                        aria-label="name"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the name of the product.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="manufacturer"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Manufacturer</FormLabel>
                                <FormControl>
                                    <Select
                                        {...field}
                                        aria-label="manufacturer"
                                        options={manufacturerOptions}
                                        placeholder="Select a manufacturer"
                                        className="w-full"
                                        inputId="manufacturer"
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                borderColor: state.isFocused
                                                    ? "hsl(var(--input))"
                                                    : "hsl(var(--input))",
                                                boxShadow: state.isFocused
                                                    ? "0 0 0 1px hsl(var(--ring))"
                                                    : "none",
                                                "&:hover": {
                                                    borderColor:
                                                        "hsl(var(--input))",
                                                },
                                                borderRadius: "var(--radius)",
                                                backgroundColor:
                                                    "hsl(var(--background))",
                                                color: "hsl(var(--foreground))",
                                                fontSize: 14,
                                            }),
                                            menu: (base) => ({
                                                ...base,
                                                borderRadius: "var(--radius)",
                                                backgroundColor:
                                                    "hsl(var(--popover))",
                                                color: "hsl(var(--popover-foreground))",
                                                fontSize: 14,
                                            }),
                                            option: (base, state) => ({
                                                ...base,
                                                backgroundColor:
                                                    state.isSelected
                                                        ? "hsl(var(--primary))"
                                                        : state.isFocused
                                                        ? "hsl(var(--accent))"
                                                        : "hsl(var(--background))",
                                                color: state.isSelected
                                                    ? "hsl(var(--primary-foreground))"
                                                    : "hsl(var(--foreground))",
                                                "&:hover": {
                                                    backgroundColor:
                                                        "hsl(var(--accent))",
                                                    color: "hsl(var(--accent-foreground))",
                                                },
                                            }),
                                            placeholder: (base) => ({
                                                ...base,
                                                color: "hsl(var(--muted-foreground))",
                                            }),
                                            singleValue: (base) => ({
                                                ...base,
                                                color: "hsl(var(--foreground))",
                                            }),
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the manufacturer of the product.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Add Product</Button>
                </form>
            </Form>
        </div>
    );
}

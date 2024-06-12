"use client";

import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Product, Distributor } from "@prisma/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddItemSchema } from "../schemas";
import { createItem } from "../actions";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

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

type AddItemFormValues = z.infer<typeof AddItemSchema>;

const selectStyles = {
    control: (base, state) => ({
        ...base,
        borderColor: state.isFocused
            ? "hsl(var(--input))"
            : "hsl(var(--input))",
        boxShadow: state.isFocused ? "0 0 0 1px hsl(var(--ring))" : "none",
        "&:hover": {
            borderColor: "hsl(var(--input))",
        },
        borderRadius: "var(--radius)",
        backgroundColor: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
        fontSize: 14,
    }),
    menu: (base) => ({
        ...base,
        borderRadius: "var(--radius)",
        backgroundColor: "hsl(var(--popover))",
        color: "hsl(var(--popover-foreground))",
        fontSize: 14,
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
            ? "hsl(var(--primary))"
            : state.isFocused
            ? "hsl(var(--accent))"
            : "hsl(var(--background))",
        color: state.isSelected
            ? "hsl(var(--primary-foreground))"
            : "hsl(var(--foreground))",
        "&:hover": {
            backgroundColor: "hsl(var(--accent))",
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
};

export default function AddItemForm({
    products,
    distributors,
}: {
    products: Product[];
    distributors: Distributor[];
}) {
    const form = useForm<AddItemFormValues>({
        resolver: zodResolver(AddItemSchema),
    });

    const onSubmit = async (data: AddItemFormValues) => {
        const response = await createItem(data);

        if (!response.success) {
            response.issues?.forEach((issue) => {
                issue.path.forEach((pathElement: any) => {
                    form.setError(pathElement, {
                        type: "manual",
                        message: issue.message,
                    });
                });
            });
        } else {
            form.reset({
                product: {
                    value: "",
                    label: "",
                },
                distributor: {
                    value: "",
                    label: "",
                },
                price: 0,
                purchaseDate: "",
                initialQuantity: 0,
                currentQuantity: 0,
            });
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
        <div className="space-y-6 max-w-lg mx-auto">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="product"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product</FormLabel>
                                <FormControl>
                                    <Select
                                        {...field}
                                        aria-label="product"
                                        options={productOptions}
                                        placeholder="Select a product"
                                        className="w-full"
                                        inputId="productOptions"
                                        styles={selectStyles}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the product being added to the
                                    inventory.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="distributor"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Distributor</FormLabel>
                                <FormControl>
                                    <Select
                                        {...field}
                                        aria-label="distributor"
                                        options={distributorOptions}
                                        placeholder="Select a distributor"
                                        className="w-full"
                                        inputId="distributorOptions"
                                        styles={selectStyles}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the distributor you bought the
                                    product from.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        value={field.value || ""}
                                        onChange={(e) =>
                                            field.onChange(
                                                parseFloat(e.target.value) || ""
                                            )
                                        }
                                        aria-label="price"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the price of the product.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="purchaseDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Purchase Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(
                                                        new Date(field.value),
                                                        "PPP"
                                                    )
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={
                                                field.value
                                                    ? new Date(field.value)
                                                    : undefined
                                            }
                                            onSelect={(date) =>
                                                field.onChange(
                                                    date
                                                        ? format(
                                                              date,
                                                              "yyyy-MM-dd"
                                                          )
                                                        : ""
                                                )
                                            }
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    This is the date the product was purchased.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="initialQuantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Initial Quantity</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        value={field.value || ""}
                                        onChange={(e) =>
                                            field.onChange(
                                                parseInt(e.target.value, 10) ||
                                                    ""
                                            )
                                        }
                                        aria-label="initialQuantity"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the initial quantity of the product
                                    from when the item was purchased.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="currentQuantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Quantity</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        value={field.value || ""}
                                        onChange={(e) =>
                                            field.onChange(
                                                parseInt(e.target.value, 10) ||
                                                    ""
                                            )
                                        }
                                        aria-label="currentQuantity"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is current quantity of the product on
                                    hand.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Add Item</Button>
                </form>
            </Form>
        </div>
    );
}

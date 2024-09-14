"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { Product, Distributor } from "@prisma/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddItemSchema } from "../../schemas";
import { createItem } from "../../actions";

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
import { ItemWithProductDistributor } from "./schemas";
import { editItem } from "./actions";

type AddItemFormValues = z.infer<typeof AddItemSchema>;

const selectStyles = {
    control: (base: any, state: { isFocused: any }) => ({
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
    menu: (base: any) => ({
        ...base,
        borderRadius: "var(--radius)",
        backgroundColor: "hsl(var(--popover))",
        color: "hsl(var(--popover-foreground))",
        fontSize: 14,
    }),
    option: (base: any, state: { isSelected: any; isFocused: any }) => ({
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
    placeholder: (base: any) => ({
        ...base,
        color: "hsl(var(--muted-foreground))",
    }),
    singleValue: (base: any) => ({
        ...base,
        color: "hsl(var(--foreground))",
    }),
};

export default function ItemForm({
    products,
    distributors,
    item,
}: {
    products: Product[];
    distributors: Distributor[];
    item?: ItemWithProductDistributor;
}) {
    const router = useRouter();

    const form = useForm<AddItemFormValues>({
        defaultValues: item
            ? {
                  product: {
                      value: item.productId,
                      label: item.product.name,
                  },
                  distributor: {
                      value: item.distributorId,
                      label: item.distributor.name,
                  },
                  price: item.price,
                  purchaseDate: format(item.purchaseDate, "yyyy-MM-dd"),
                  initialQuantity: item.initialQuantity,
                  currentQuantity: item.currentQuantity,
              }
            : undefined,
        resolver: zodResolver(AddItemSchema),
    });

    const onSubmit = async (data: AddItemFormValues) => {
        if (item) {
            const response = await editItem(item.id, data);

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
                router.push("/dashboard/inventory");
            }
        } else {
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
                router.push("/dashboard/inventory");
            }
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
        <div>
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
                                        step="0.01"
                                        {...field}
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
                                        step="0.01"
                                        {...field}
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
                                        step="0.01"
                                        {...field}
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
                    <Button type="submit">{item ? "Update" : "Add"}</Button>
                </form>
            </Form>
        </div>
    );
}

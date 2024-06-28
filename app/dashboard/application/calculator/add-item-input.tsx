import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Item, Prisma } from "@prisma/client";

import Select from "react-select";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { SprayCalculatorSchema } from "@/app/schemas";

type ItemsWithProduct = Prisma.ItemGetPayload<{
    include: {
        product: true;
    };
}>;

type SprayCalculatorForm = z.infer<typeof SprayCalculatorSchema>;

export default function AddItemInput({
    items,
    form,
    fields,
    append,
    remove,
}: {
    items: ItemsWithProduct[];
    form: UseFormReturn<SprayCalculatorForm>;
    fields: any;
    append: any;
    remove: any;
}) {
    const itemOptions = items?.map((item) => ({
        value: item.id,
        label: item.product.name
    }));

    return (
        <div>
            <FormLabel>Items</FormLabel>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Item ID</TableHead>
                        <TableHead>Application Rate</TableHead>
                        <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fields.map((item: any, index: any) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <FormField
                                        control={form.control}
                                        name={`items.${index}.itemId`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        aria-label="product"
                                                        options={itemOptions}
                                                        placeholder="Select a product"
                                                        className="w-full"
                                                        inputId="productOptions"
                                                        // styles={selectStyles}
                                                    />
                                                    {/* <Input
                                                        placeholder="Item ID"
                                                        {...field}
                                                        aria-label={`items.${index}.itemId`}
                                                    /> */}
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormField
                                        control={form.control}
                                        name={`items.${index}.applicationRate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                parseFloat(
                                                                    e.target
                                                                        .value
                                                                ) || ""
                                                            )
                                                        }
                                                        aria-label={`items.${index}.applicationRate`}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => remove(index)}
                                    >
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}

                    {/* <TableRow>
                        <TableCell>
                            <Label htmlFor="stock-2" className="sr-only">
                                Stock
                            </Label>
                            <Input
                                id="stock-2"
                                type="number"
                                defaultValue="143"
                            />
                        </TableCell>
                        <TableCell>
                            <Label htmlFor="price-2" className="sr-only">
                                Price
                            </Label>
                            <Input
                                id="price-2"
                                type="number"
                                defaultValue="99.99"
                            />
                        </TableCell>
                        <TableCell>
                            <Button type="button" variant="destructive">
                                Remove
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Label htmlFor="stock-3" className="sr-only">
                                Stock
                            </Label>
                            <Input
                                id="stock-3"
                                type="number"
                                defaultValue="32"
                            />
                        </TableCell>
                        <TableCell>
                            <Label htmlFor="price-3" className="sr-only">
                                Stock
                            </Label>
                            <Input
                                id="price-3"
                                type="number"
                                defaultValue="99.99"
                            />
                        </TableCell>
                        <TableCell>
                            <Button type="button" variant="destructive">
                                Remove
                            </Button>
                        </TableCell>
                    </TableRow> */}
                </TableBody>
            </Table>
            <Button
                type="button"
                onClick={() => append({ itemId: "", applicationRate: 0 })}
                size="sm"
                variant="ghost"
                className="gap-1"
            >
                <PlusCircle className="h-3.5 w-3.5" />
                Add Item
            </Button>
        </div>
    );
}

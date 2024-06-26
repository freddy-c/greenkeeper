"use client";

import { AddApplicationSchema } from "@/app/schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
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

import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";

type AddApplicationFormValues = z.infer<typeof AddApplicationSchema>;

export default function AddApplicationForm() {
    const form = useForm<AddApplicationFormValues>({
        resolver: zodResolver(AddApplicationSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    });

    const onSubmit = (data: AddApplicationFormValues) => {
        console.log(data);
    };

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Application Date</FormLabel>
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
                                    This is the date the application was made.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="operator"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Operator</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder=""
                                        {...field}
                                        aria-label="operator"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the name of the operator who
                                    completed the application.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="waterVolume"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Water Volume</FormLabel>
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
                                        aria-label="waterVolume"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the price of the volume of water
                                    used in the application.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="temperature"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Temperature</FormLabel>
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
                                        aria-label="temperature"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the average air temperature during
                                    the application.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="windSpeed"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Wind Speed</FormLabel>
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
                                        aria-label="windSpeed"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the average wind speed during the
                                    application.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="observations"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Observations</FormLabel>
                                <FormControl>
                                    <Textarea
                                        // placeholder="Observations about the application."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Observations about the application e.g.
                                    motivation for the application.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="space-y-8">
                        <ul>
                            {fields.map((item, index) => (
                                <div key={item.id} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name={`items.${index}.itemId`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Item ID</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder=""
                                                        {...field}
                                                        aria-label={`items.${index}.itemId`}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    This is the id of the item.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`items.${index}.quantity`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Item Quantity
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={(event) => {
                                                            if (
                                                                !Number.isNaN(
                                                                    event.target
                                                                        .value
                                                                )
                                                            )
                                                                field.onChange(
                                                                    parseFloat(
                                                                        event
                                                                            .target
                                                                            .value
                                                                    )
                                                                );
                                                        }}
                                                        aria-label={`items.${index}.quantity`}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    This is the quantity of the
                                                    item used in the
                                                    application.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => remove(index)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            ))}
                        </ul>
                        <Button
                            type="button"
                            onClick={() => append({ itemId: "", quantity: 0 })}
                        >
                            Add Item
                        </Button>
                    </div>
                    <Button type="submit">Add Application</Button>
                </form>
            </Form>
        </div>
    );
}

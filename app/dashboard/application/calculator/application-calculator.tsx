"use client";

import { SprayCalculatorSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import Select from "react-select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import AddItemInput from "./add-item-input";
import Calculations from "./calculations";
import { Sprayer, ItemsWithProduct } from "@/app/types";

type SprayCalculatorForm = z.infer<typeof SprayCalculatorSchema>;

export default function ApplicationCalculator({
    items,
    sprayers,
}: {
    items: ItemsWithProduct[];
    sprayers: Sprayer[];
}) {
    const form = useForm<SprayCalculatorForm>({
        resolver: zodResolver(SprayCalculatorSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    });

    const onSubmit = (data: SprayCalculatorForm) => console.log("data", data);

    const sprayerOptions = sprayers.map((sprayer) => ({
        value: sprayer.id,
        label: sprayer.name,
    }));

    return (
        <div>
            <hr />
            <br />

            <Calculations form={form} />

            <br />
            <hr />
            <br />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="referencePressure"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Reference Operating Pressure</FormLabel>
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
                                        aria-label="referencePressure"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is a reference pressure in bar for the
                                    specific nozzle being used.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="referenceNozzleCapacity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Reference Nozzle Capacity</FormLabel>
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
                                        aria-label="referenceNozzleCapacity"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is a reference nozzle capacity in l/min
                                    for the specific nozzle being used.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="forwardSpeed"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Forward Speed</FormLabel>
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
                                        aria-label="forwardSpeed"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the forward speed of the sprayer in
                                    km/h.
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
                                    This is the water rate in l/ha for the
                                    application.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nozzleSpacing"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nozzle Spacing</FormLabel>
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
                                        aria-label="nozzleSpacing"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the spacing of the nozzles on the
                                    boom in metres.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Area</FormLabel>
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
                                        aria-label="area"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the area in hectares being sprayed.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="sprayer"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sprayer</FormLabel>
                                <FormControl>
                                    <Select
                                        {...field}
                                        aria-label="sprayer"
                                        options={sprayerOptions}
                                        placeholder="Select a sprayer"
                                        className="w-full"
                                        inputId="sprayer"
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
                                    This is the sprayer used for the
                                    application.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <AddItemInput
                        items={items}
                        form={form}
                        fields={fields}
                        append={append}
                        remove={remove}
                    />

                    {/* <ul className="space-y-8">
                        {fields.map((item, index) => {
                            return (
                                <li key={item.id} className="space-y-8">
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
                                        name={`items.${index}.applicationRate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Item Application Rate
                                                </FormLabel>
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
                                                <FormDescription>
                                                    This is the application rate
                                                    of this specific item.
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
                                </li>
                            );
                        })}
                    </ul> */}

                    {/* <Button type="submit">Calculate</Button> */}
                </form>
            </Form>
        </div>
    );
}

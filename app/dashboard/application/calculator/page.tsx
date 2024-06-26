"use client";

import { SprayCalculatorSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";

type SprayCalculatorForm = z.infer<typeof SprayCalculatorSchema>;

let reloads = 0;

export default function CalculatorPage() {
    reloads++;
    const [pressure, setPressure] = React.useState(0);
    const [nozzleOutput, setNozzleOutput] = React.useState(0);

    const form = useForm<SprayCalculatorForm>({
        resolver: zodResolver(SprayCalculatorSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    });

    const onSubmit = (data: SprayCalculatorForm) => console.log("data", data);

    function totalCal(results: any) {
        const [
            referencePressure,
            referenceNozzleCapacity,
            forwardSpeed,
            waterVolume,
            nozzleSpacing,
            area,
            items,
        ] = results;

        let totalProductVolume = 0;

        for (const key in items) {
            totalProductVolume =
                totalProductVolume + results[6][key]["applicationRate"];
        }

        const nozzleOutputNumber = parseFloat(nozzleOutput.toFixed(2));
        // setNozzleOutput(nozzleOutputNumber);

        return nozzleOutputNumber;
    }

    const results = useWatch({
        control: form.control,
        name: [
            "referencePressure",
            "referenceNozzleCapacity",
            "forwardSpeed",
            "waterVolume",
            "nozzleSpacing",
            "area",
            "items",
        ],
    });
    const output = totalCal(results);

    return (
        <div>
            {reloads}
            <h1>Calculator</h1>
            {output && <p>Total: {output}</p>}

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
                                <FormLabel>Reference Pressure</FormLabel>
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
                    <ul className="space-y-8">
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
                    </ul>
                    <Button
                        type="button"
                        onClick={() =>
                            append({ itemId: "", applicationRate: 0 })
                        }
                    >
                        Add Item
                    </Button>

                    <Button type="submit">Calculate</Button>
                </form>
            </Form>
        </div>
    );
}

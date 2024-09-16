"use client";

import { ApplicationSchema } from "./schemas";

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

import { PlusCircle } from "lucide-react";

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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { default as ReactSelect } from "react-select";
import { ItemsWithProduct, Sprayer } from "@/app/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ManagementZone } from "@prisma/client";

type AddApplicationFormValues = z.infer<typeof ApplicationSchema>;

export default function ApplicationForm({
    sprayers,
    items,
    managementZones,
}: {
    sprayers: Sprayer[];
    items: ItemsWithProduct[];
    managementZones: ManagementZone[];
}) {
    const form = useForm<AddApplicationFormValues>({
        resolver: zodResolver(ApplicationSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    });

    const areas = useFieldArray({
        control: form.control,
        name: "areas",
    });

    const onSubmit = (data: AddApplicationFormValues) => {
        console.log(data);
    };

    const sprayerOptions = sprayers.map((sprayer) => ({
        value: sprayer.id,
        label: sprayer.name,
    }));

    const itemOptions = items?.map((item) => ({
        value: item.id,
        label: item.product.name,
    }));

    const managementZoneOptions = managementZones.map((managementZone) => ({
        value: managementZone.id,
        label: managementZone.name,
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
                        name="sprayer"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sprayer</FormLabel>
                                <FormControl>
                                    <ReactSelect
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
                        name="method"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Application Method</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select the type of the product" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Broadcast">
                                            Broadcast
                                        </SelectItem>
                                        <SelectItem value="Spray">
                                            Spray
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    This is the method used in the application.
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
                        {fields.map((item: any, index: any) => {
                            return (
                                <Card key={item.id}>
                                    <CardHeader>{index + 1}</CardHeader>
                                    <CardContent className="space-y-8">
                                        <FormField
                                            control={form.control}
                                            name={`items.${index}.itemId`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Item</FormLabel>
                                                    <FormControl>
                                                        <ReactSelect
                                                            {...field}
                                                            aria-label="product"
                                                            options={
                                                                itemOptions
                                                            }
                                                            placeholder="Select a product"
                                                            className="w-full"
                                                            inputId="productOptions"
                                                            styles={{
                                                                control: (
                                                                    base,
                                                                    state
                                                                ) => ({
                                                                    ...base,
                                                                    borderColor:
                                                                        state.isFocused
                                                                            ? "hsl(var(--input))"
                                                                            : "hsl(var(--input))",
                                                                    boxShadow:
                                                                        state.isFocused
                                                                            ? "0 0 0 1px hsl(var(--ring))"
                                                                            : "none",
                                                                    "&:hover": {
                                                                        borderColor:
                                                                            "hsl(var(--input))",
                                                                    },
                                                                    borderRadius:
                                                                        "var(--radius)",
                                                                    backgroundColor:
                                                                        "hsl(var(--background))",
                                                                    color: "hsl(var(--foreground))",
                                                                    fontSize: 14,
                                                                }),
                                                                menu: (
                                                                    base
                                                                ) => ({
                                                                    ...base,
                                                                    borderRadius:
                                                                        "var(--radius)",
                                                                    backgroundColor:
                                                                        "hsl(var(--popover))",
                                                                    color: "hsl(var(--popover-foreground))",
                                                                    fontSize: 14,
                                                                }),
                                                                option: (
                                                                    base,
                                                                    state
                                                                ) => ({
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
                                                                placeholder: (
                                                                    base
                                                                ) => ({
                                                                    ...base,
                                                                    color: "hsl(var(--muted-foreground))",
                                                                }),
                                                                singleValue: (
                                                                    base
                                                                ) => ({
                                                                    ...base,
                                                                    color: "hsl(var(--foreground))",
                                                                }),
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        This is the item used in
                                                        the application.
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
                                                        Application Rate
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
                                                        This is the application
                                                        rate of this particular
                                                        item in l/ha.
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
                                            Remove
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}

                        <Button
                            type="button"
                            onClick={() =>
                                append({
                                    itemId: { value: "", label: "" },
                                    applicationRate: 0,
                                })
                            }
                            size="sm"
                            variant="ghost"
                            className="gap-1"
                        >
                            <PlusCircle className="h-3.5 w-3.5" />
                            Add Item
                        </Button>
                    </div>
                    <div className="space-y-8">
                        {areas.fields.map((area: any, index: any) => {
                            return (
                                <Card key={area.id}>
                                    <CardHeader>{index + 1}</CardHeader>
                                    <CardContent className="space-y-8">
                                        <FormField
                                            control={form.control}
                                            name={`areas.${index}.managementZoneId`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Area</FormLabel>
                                                    <FormControl>
                                                        <ReactSelect
                                                            {...field}
                                                            aria-label="product"
                                                            options={
                                                                managementZoneOptions
                                                            }
                                                            placeholder="Select an area"
                                                            className="w-full"
                                                            inputId="productOptions"
                                                            styles={{
                                                                control: (
                                                                    base,
                                                                    state
                                                                ) => ({
                                                                    ...base,
                                                                    borderColor:
                                                                        state.isFocused
                                                                            ? "hsl(var(--input))"
                                                                            : "hsl(var(--input))",
                                                                    boxShadow:
                                                                        state.isFocused
                                                                            ? "0 0 0 1px hsl(var(--ring))"
                                                                            : "none",
                                                                    "&:hover": {
                                                                        borderColor:
                                                                            "hsl(var(--input))",
                                                                    },
                                                                    borderRadius:
                                                                        "var(--radius)",
                                                                    backgroundColor:
                                                                        "hsl(var(--background))",
                                                                    color: "hsl(var(--foreground))",
                                                                    fontSize: 14,
                                                                }),
                                                                menu: (
                                                                    base
                                                                ) => ({
                                                                    ...base,
                                                                    borderRadius:
                                                                        "var(--radius)",
                                                                    backgroundColor:
                                                                        "hsl(var(--popover))",
                                                                    color: "hsl(var(--popover-foreground))",
                                                                    fontSize: 14,
                                                                }),
                                                                option: (
                                                                    base,
                                                                    state
                                                                ) => ({
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
                                                                placeholder: (
                                                                    base
                                                                ) => ({
                                                                    ...base,
                                                                    color: "hsl(var(--muted-foreground))",
                                                                }),
                                                                singleValue: (
                                                                    base
                                                                ) => ({
                                                                    ...base,
                                                                    color: "hsl(var(--foreground))",
                                                                }),
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        This is an area treated
                                                        in the application.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() => areas.remove(index)}
                                        >
                                            Remove
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}

                        <Button
                            type="button"
                            onClick={() =>
                                areas.append({
                                    managementZoneId: { value: "", label: "" },
                                })
                            }
                            size="sm"
                            variant="ghost"
                            className="gap-1"
                        >
                            <PlusCircle className="h-3.5 w-3.5" />
                            Add Area
                        </Button>
                    </div>
                    <Button type="submit">Add Application</Button>
                </form>
            </Form>
        </div>
    );
}

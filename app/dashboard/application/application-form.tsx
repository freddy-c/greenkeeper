"use client";

import { ApplicationSchema } from "./schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
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
import { TimePicker } from "@/components/ui/time-picker-input/time-picker";
import { createApplication } from "./actions";
import { useRouter } from "next/navigation";

type ApplicationFormValues = z.infer<typeof ApplicationSchema>;

// Function to infer the unit based on product form
const getUnitByForm = (form: string) => {
    switch (form) {
        case "Liquid":
            return "l/ha"; // Liters per hectare
        case "Granular":
            return "kg/ha";
        case "Soluble":
            return "kg/ha"; // Kilograms per hectare
        default:
            return "l/ha"; // Default unit
    }
};

export default function ApplicationForm({
    sprayers,
    items,
    managementZones,
}: {
    sprayers: Sprayer[];
    items: ItemsWithProduct[];
    managementZones: ManagementZone[];
}) {
    const router = useRouter();

    const form = useForm<ApplicationFormValues>({
        resolver: zodResolver(ApplicationSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    });

    // Watch the 'items' array to track changes in selected product
    const watchedItems = useWatch({
        control: form.control,
        name: "items", // Watch the entire items field array
    });

    const areas = useFieldArray({
        control: form.control,
        name: "areas",
    });

    // Use useWatch to track changes to the areas field
    const watchedAreas = useWatch({
        control: form.control,
        name: "areas", // This watches the areas field array
    });

    // Calculate the total area dynamically whenever watchedAreas changes
    const totalArea =
        watchedAreas?.reduce((sum: number, area: any) => {
            const managementZone = managementZones.find(
                (zone) => zone.id === area?.managementZoneId?.value
            );
            return sum + (managementZone?.area || 0);
        }, 0) || 0;

    const applicationMethod = form.watch("method");

    const onSubmit = async (data: ApplicationFormValues) => {
        const response = await createApplication(data);

        if (!response.success) {
            // Loop through validation issues and set form errors
            response.issues?.forEach((issue) => {
                issue.path.forEach((pathElement: any) => {
                    form.setError(pathElement, {
                        type: "manual",
                        message: issue.message,
                    });
                });
            });
        } else {
            // Redirect to the appropriate page after successful submission
            router.push("/dashboard/applications");
        }
    };

    const sprayerOptions = sprayers.map((sprayer) => ({
        value: sprayer.id,
        label: sprayer.name,
    }));

    const itemOptions = items?.map((item) => ({
        value: item.id,
        label: item.product.name,
        form: item.product.form,
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
                        name="startTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Time</FormLabel>
                                <TimePicker
                                    date={field.value}
                                    setDate={field.onChange}
                                />
                                <FormDescription>
                                    This is the time the applciation started.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Time</FormLabel>
                                <TimePicker
                                    date={field.value}
                                    setDate={field.onChange}
                                />
                                <FormDescription>
                                    This is the time the applciation finished.
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
                                            <SelectValue placeholder="Select the method of application" />
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

                    {applicationMethod === "Spray" && (
                        <>
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
                                                    menu: (base) => ({
                                                        ...base,
                                                        borderRadius:
                                                            "var(--radius)",
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
                                                        parseFloat(
                                                            e.target.value
                                                        ) || ""
                                                    )
                                                }
                                                aria-label="waterVolume"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is the price of the volume of
                                            water used in the application.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

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
                        <FormLabel>Application Items</FormLabel>
                        {fields.map((item, index) => {
                            // Get the selected product's unit from watchedItems
                            const selectedItem = itemOptions.find(
                                (option) =>
                                    option.value ===
                                    watchedItems?.[index]?.itemId?.value
                            );
                            const unit = selectedItem
                                ? getUnitByForm(selectedItem.form)
                                : "l/ha"; // Default to l/ha

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
                                                        item in {unit}.
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
                        <FormLabel>Application Areas</FormLabel>
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
                                    managementZoneId: {
                                        value: "",
                                        label: "",
                                    },
                                })
                            }
                            size="sm"
                            variant="ghost"
                            className="gap-1"
                        >
                            <PlusCircle className="h-3.5 w-3.5" />
                            Add Area
                        </Button>

                        {/* Display total area */}
                        <div>
                            <h3 className="text-lg font-bold">
                                Total Area: {totalArea} m²
                            </h3>
                        </div>
                    </div>
                    <Button type="submit">Add Application</Button>
                </form>
            </Form>
        </div>
    );
}

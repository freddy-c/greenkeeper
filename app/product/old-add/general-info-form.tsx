"use client";

import { useForm } from "react-hook-form";
import { FormValues, GeneralInfo, generalInfoSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";

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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { default as ReactSelect } from "react-select";
import { Manufacturer } from "@prisma/client";

export default function GeneralInfoForm({
    manufacturers,
    formData,
    updateFormData,
    handleNext,
}: {
    manufacturers: Manufacturer[];
    formData: FormValues | null;
    updateFormData: any;
    handleNext: any;
}) {
    const form = useForm<GeneralInfo>({
        resolver: zodResolver(generalInfoSchema),
        defaultValues: {
            name: formData?.generalInfo.name,
            manufacturer: {
                value: formData?.generalInfo.manufacturer.value,
                label: formData?.generalInfo.manufacturer.label,
            },
            type: formData?.generalInfo.type,
            form: formData?.generalInfo.form,
        },
    });

    const onSubmit = async (data: GeneralInfo) => {
        updateFormData({ generalInfo: data });
        handleNext();

        console.log(data);
    };

    const manufacturerOptions = manufacturers.map((manufacturer) => ({
        value: manufacturer.id,
        label: manufacturer.name,
    }));

    return (
        <div>
            <h2>General Information</h2>
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
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is the name of the product.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* <FormField
                        control={form.control}
                        name="manufacturerId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Manufacturer Id</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is id of the manufacturer.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}

                    <FormField
                        control={form.control}
                        name="manufacturer"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Manufacturer</FormLabel>
                                <FormControl>
                                    <ReactSelect
                                        {...field}
                                        aria-label="sprayer"
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
                                    This is the manufactuer of the product.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a product type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Fertilizer">
                                            Fertilizer
                                        </SelectItem>
                                        <SelectItem value="WettingAgent">
                                            Wetting Agent
                                        </SelectItem>
                                        <SelectItem value="Herbicide">
                                            Herbicide
                                        </SelectItem>
                                        <SelectItem value="Fungicide">
                                            Fungicide
                                        </SelectItem>
                                        <SelectItem value="GrowthRegulator">
                                            Growth Regulator
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    This is the type of the product.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="form"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Form</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a product form" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Granular">
                                            Granular
                                        </SelectItem>
                                        <SelectItem value="Liquid">
                                            Liquid
                                        </SelectItem>
                                        <SelectItem value="Soluble">
                                            Soluble
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    This is the form of the product.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Next</Button>
                </form>
            </Form>
        </div>
    );
}

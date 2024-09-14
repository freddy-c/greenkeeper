"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

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

import { default as ReactSelect } from "react-select";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Manufacturer, Product } from "@prisma/client";

import {
    ProductFormType,
    ProductFormSchema,
    ProductWithManufacturer,
} from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct, editProduct } from "@/app/actions";

export default function ProductForm({
    product,
    manufacturers,
}: {
    manufacturers: Manufacturer[];
    // Pass the product to be edited into the component
    // Optional prop, if it exists we know we should be in edit mode
    product?: ProductWithManufacturer;
}) {
    const router = useRouter();

    const form = useForm<ProductFormType>({
        defaultValues: product
            ? {
                  name: product.name,
                  manufacturer: {
                      value: product.manufacturerId,
                      label: product.manufacturer.name,
                  },
                  type: product.type,
                  form: product.form,
                  nitrogen: product.nitrogen ?? undefined,
                  potassium: product.potassium ?? undefined,
                  phosphorus: product.phosphorus ?? undefined,
                  calcium: product.calcium ?? undefined,
                  magnesium: product.magnesium ?? undefined,
                  sulfur: product.sulfur ?? undefined,
                  iron: product.iron ?? undefined,
                  manganese: product.manganese ?? undefined,
                  specificGravity: product.specificGravity ?? undefined,
              }
            : undefined,
        resolver: zodResolver(ProductFormSchema),
    });

    // Watch the product type and form type
    const productType = form.watch("type");
    const formType = form.watch("form");

    const onSubmit = async (data: ProductFormType) => {
        console.log(data);

        if (product) {
            const response = await editProduct(product.id, data);

            console.log(response);

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
                router.push("/product");
            }
        } else {
            const response = await createProduct(data);

            console.log(response);

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
                router.push("/product");
            }
        }
    };

    const manufacturerOptions = manufacturers.map((manufacturer) => ({
        value: manufacturer.id,
        label: manufacturer.name,
    }));

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 space-y-8"
                >
                    {/* Product Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    The name of the product.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <input {...form.register("name")} placeholder="Product Name" /> */}

                    {/* Product Manufacturer */}
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

                    {/* Product Type */}
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Type</FormLabel>
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
                                        <SelectItem value="Fertiliser">
                                            Fertiliser
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
                    {/* <select {...form.register("type")}>
                    <option value="Fertiliser">Fertiliser</option>
                    <option value="WettingAgent">Wetting Agent</option>
                    <option value="Herbicide">Herbicide</option>
                    <option value="Fungicide">Fungicide</option>
                    <option value="GrowthRegulator">Growth Regulator</option>
                </select> */}

                    {/* Form Type */}
                    <FormField
                        control={form.control}
                        name="form"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Form</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select the form of the product" />
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
                    {/* <select {...form.register("form")}>
                    <option value="Granular">Granular</option>
                    <option value="Liquid">Liquid</option>
                    <option value="Soluble">Soluble</option>
                </select> */}

                    {/* Fertiliser-only fields */}
                    {productType === "Fertiliser" && (
                        <>
                            <FormField
                                control={form.control}
                                name="nitrogen"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nitrogen</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            The proportion of nitrogen by weight
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="potassium"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Potassium</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            The proportion of potassium by
                                            weight
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phosphorus"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phosphorus</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            The proportion of phosphorus by
                                            weight
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="calcium"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Calcium</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            The proportion of calcium by weight
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="magnesium"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Magnesium</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            The proportion of magnesium by
                                            weight
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="sulfur"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sulfur</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            The proportion of sulfur by weight
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="iron"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Iron</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            The proportion of iron by weight
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="manganese"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Manganese</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            The proportion of manganese by
                                            weight
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {/* Liquid-only field */}
                    {formType === "Liquid" && (
                        <>
                            <FormField
                                control={form.control}
                                name="specificGravity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Specific Gravity</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Specific Gravity of the product.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                        // <input
                        //     {...form.register("specificGravity")}
                        //     placeholder="Specific Gravity"
                        //     type="number"
                        // />
                    )}

                    <Button type="submit">{product ? "Update" : "Add"}</Button>
                </form>
            </Form>
        </div>
    );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormInfo, formInfoSchema, FormValues } from "./schemas";

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

export default function FormInfoForm({
    formData,
    updateFormData,
    handlePrev,
    handleSubmit,
}: {
    formData: FormValues | null;
    updateFormData: any;
    handlePrev: any;
    handleSubmit: any;
}) {
    const form = useForm<FormInfo>({
        resolver: zodResolver(formInfoSchema),
        defaultValues: {
            granuleSizeMin: formData?.formInfo?.granuleSizeMin,
            granuleSizeMax: formData?.formInfo?.granuleSizeMax,
            sgn: formData?.formInfo?.sgn,
            minCuttingHeight: formData?.formInfo?.minCuttingHeight,
            specificGravity: formData?.formInfo?.specificGravity,
            minWaterRate: formData?.formInfo?.minWaterRate,
            maxWaterRate: formData?.formInfo?.maxWaterRate,
            waterRateMin: formData?.formInfo?.waterRateMin,
            waterRateMax: formData?.formInfo?.waterRateMax,
        },
    });

    const onSubmit = async (data: FormInfo) => {
        handleSubmit({
            ...formData,
            formInfo: data,
        });
    };

    const onPrevious = () => {
        const data = form.getValues();
        updateFormData({ formInfo: data });
        handlePrev();
    };

    return (
        <div>
            <h2>Form Information</h2>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    {formData?.generalInfo.form === "Granular" && (
                        <div className="space-y-8">
                            <FormField
                                control={form.control}
                                name="granuleSizeMin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Granule Size Min</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Minimum granule size.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="granuleSizeMax"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Granule Size Max</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Maximum granule size.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="sgn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>SGN</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Size Guide Number.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="minCuttingHeight"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Min Cutting Height
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Minimum cutting height.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    {formData?.generalInfo.form === "Liquid" && (
                        <div className="space-y-8">
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
                                            Specific gravity.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="minWaterRate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Min Water Rate</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Minimum water rate.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="maxWaterRate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Max Water Rate</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Maximum water rate.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    {formData?.generalInfo.form === "Soluble" && (
                        <div className="space-y-8">
                            <FormField
                                control={form.control}
                                name="waterRateMin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Water Rate Min</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Minimum water rate.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="waterRateMax"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Water Rate Max</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Maximum water rate.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    <Button onClick={onPrevious}>Previous</Button>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
}

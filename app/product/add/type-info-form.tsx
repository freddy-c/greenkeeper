"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormValues, TypeInfo, typeInfoSchema } from "./schemas";

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

export default function TypeInfoForm({
    formData,
    updateFormData,
    handleNext,
    handlePrev,
}: {
    formData: FormValues | null;
    updateFormData: any;
    handleNext: any;
    handlePrev: any;
}) {
    const form = useForm<TypeInfo>({
        resolver: zodResolver(typeInfoSchema),
        defaultValues: {
            nitrogen: formData?.typeInfo?.nitrogen,
            potassium: formData?.typeInfo?.potassium,
            phosphorus: formData?.typeInfo?.phosphorus,
            calcium: formData?.typeInfo?.calcium,
            magnesium: formData?.typeInfo?.magnesium,
            sulfur: formData?.typeInfo?.sulfur,
            iron: formData?.typeInfo?.iron,
            manganese: formData?.typeInfo?.manganese,
            longevity: formData?.typeInfo?.longevity,
            turfResponse: formData?.typeInfo?.turfResponse,
            maxIndividualRate: formData?.typeInfo?.maxIndividualRate,
            maxNoOfApplications: formData?.typeInfo?.maxNoOfApplications,
        },
    });

    const onSubmit = async (data: TypeInfo) => {
        updateFormData({ typeInfo: data });
        handleNext();

        console.log(data);
    };

    const onPrevious = () => {
        const data = form.getValues();
        updateFormData({ typeInfo: data });
        handlePrev();
    };

    return (
        <div>
            <h2>Type Information</h2>

            <div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        {formData?.generalInfo.type === "Fertilizer" && (
                            <div className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="nitrogen"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nitrogen (N)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This is the proportion of the
                                                product that is nitrogen.
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
                                            <FormLabel>Potassium (K)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This is the proportion of the
                                                product that is potassium.
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
                                            <FormLabel>
                                                Phosphorus (P)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This is the proportion of the
                                                product that is phosphorus.
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
                                            <FormLabel>Calcium (Ca)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This is the proportion of the
                                                product that is calcium.
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
                                            <FormLabel>
                                                Magnesium (Mg)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This is the proportion of the
                                                product that is magnesium.
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
                                            <FormLabel>Sulfur (S)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This is the proportion of the
                                                product that is sulfur.
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
                                            <FormLabel>Iron (Fe)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This is the proportion of the
                                                product that is iron.
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
                                            <FormLabel>
                                                Manganese (Mn)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This is the proportion of the
                                                product that is manganese.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="longevity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Longevity</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This is the longevity of the
                                                fertilizer.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="turfResponse"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Turf Response</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This is the turf response to the
                                                fertilizer.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        {formData?.generalInfo.type === "Herbicide" && (
                            <div className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="maxIndividualRate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Max Individual Rate
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This is the maximum individual
                                                rate for the herbicide.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="maxNoOfApplications"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Max Number of Applications
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This is the maximum number of
                                                applications for the herbicide.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        <Button onClick={onPrevious}>Previous</Button>
                        <Button type="submit">Next</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

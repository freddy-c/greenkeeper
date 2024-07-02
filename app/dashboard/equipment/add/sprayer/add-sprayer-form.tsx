"use client";

import { useRouter } from "next/navigation";
import { AddSprayerSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import { createSprayer } from "@/app/actions";

type AddSprayerFormValues = z.infer<typeof AddSprayerSchema>;

export default function AddSprayerForm() {
    const router = useRouter();

    const form = useForm<AddSprayerFormValues>({
        resolver: zodResolver(AddSprayerSchema),
    });

    const onSubmit = async (data: AddSprayerFormValues) => {
        const response = await createSprayer(data);

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
            router.push("/dashboard/equipment");
        }
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
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder=""
                                        {...field}
                                        aria-label="name"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the name of the sprayer.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tankCapacity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tank Capacity</FormLabel>
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
                                        aria-label="tankCapacity"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the tank capacity of the sprayer in
                                    litres.
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
                                    This is the spacing between the nozzles on
                                    the sprayers boom.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Add Sprayer</Button>
                </form>
            </Form>
        </div>
    );
}

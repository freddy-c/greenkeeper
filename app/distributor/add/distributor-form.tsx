"use client";

import { z } from "zod";
import { AddDistributorSchema } from "../schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { createDistributor } from "../actions";

type AddDistributorFormValues = z.infer<typeof AddDistributorSchema>;

export default function DistributorForm() {
    const form = useForm<AddDistributorFormValues>({
        resolver: zodResolver(AddDistributorSchema),
    });

    const onSubmit = async (data: AddDistributorFormValues) => {
        const response = await createDistributor(data);

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
            form.reset({ name: "" });
        }
    };

    return (
        <div className="space-y-6 max-w-lg mx-auto">
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
                                    This is the name of the distributor.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Add Distributor</Button>
                </form>
            </Form>
        </div>
    );
}

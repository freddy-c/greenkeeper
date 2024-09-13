"use client";

import { useState } from "react";
import GeneralInfoForm from "./general-info-form";
import { formSchema, FormValues } from "./schemas";

import TypeInfoForm from "./type-info-form";
import FormInfoForm from "./form-info-form";
import { createProduct } from "./actions";
import { Manufacturer } from "@prisma/client";

export default function AddProductForm({
    manufacturers,
}: {
    manufacturers: Manufacturer[];
}) {
    const [stage, setStage] = useState(1);
    const [formData, setFormData] = useState<FormValues | null>(null);

    const updateFormData = (data: FormValues) => {
        setFormData({ ...formData, ...data });
    };

    const handlePrev = () => setStage(stage - 1);
    const handleNext = () => setStage(stage + 1);

    const handleSubmit = (data: any) => {
        console.log("Form data:", data);
        if (data) {
            const validationResult = formSchema.safeParse(data);
            if (validationResult.success) {
                // Form data is valid, proceed with submission
                console.log("Form data is valid:", validationResult.data);
                // Add your submission logic here
                createProduct(validationResult.data);
            } else {
                // Form data is invalid, handle the validation errors
                console.log("Form data is invalid:", validationResult.error);
                // Add your error handling logic here
            }
        }
    };

    return (
        <div>
            {JSON.stringify(formData)}

            <br />
            <br />
            <hr />
            <br />

            {stage === 1 && (
                <GeneralInfoForm
                    manufacturers={manufacturers}
                    formData={formData}
                    updateFormData={updateFormData}
                    handleNext={handleNext}
                />
            )}
            {stage === 2 && (
                <TypeInfoForm
                    formData={formData}
                    updateFormData={updateFormData}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                />
            )}
            {stage === 3 && (
                <div>
                    <FormInfoForm
                        formData={formData}
                        updateFormData={updateFormData}
                        handlePrev={handlePrev}
                        handleSubmit={handleSubmit}
                    />
                </div>
            )}
        </div>
    );
}

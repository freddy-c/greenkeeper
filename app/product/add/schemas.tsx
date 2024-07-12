import { z } from "zod";

export type FormValues = {
    generalInfo: {
        name: string;
        manufacturer: { value: string; label: string };
        type: string;
        form: string;
    };
    typeInfo: any;
    formInfo: any;
};

export const generalInfoSchema = z.object({
    name: z.string(),
    manufacturer: z.object({
        value: z.string().uuid(),
        label: z.string(),
    }),
    type: z.string(),
    form: z.string(),
});

export type GeneralInfo = z.infer<typeof generalInfoSchema>;

export const GranularSchema = z.object({
    granuleSizeMin: z.coerce
        .number()
        .min(0, "Minimum granule size is required"),
    granuleSizeMax: z.coerce
        .number()
        .min(0, "Maximum granule size is required"),
    sgn: z.coerce.number().min(0, "SGN (Size Guide Number) is required"),
    minCuttingHeight: z.coerce
        .number()
        .min(0, "Minimum cutting height is required"),
});

export const LiquidSchema = z.object({
    specificGravity: z.coerce.number().min(0, "Specific gravity is required"),
    minWaterRate: z.coerce.number().min(0, "Minimum water rate is required"),
    maxWaterRate: z.coerce.number().min(0, "Maximum water rate is required"),
});

export const SolubleSchema = z.object({
    waterRateMin: z.coerce.number().min(0, "Minimum water rate is required"),
    waterRateMax: z.coerce.number().min(0, "Maximum water rate is required"),
});

export const formInfoSchema = z.union([
    GranularSchema,
    LiquidSchema,
    SolubleSchema,
]);

export type FormInfo = z.infer<typeof formInfoSchema>;

export const FertilizerSchema = z.object({
    nitrogen: z.coerce
        .number()
        .min(0, { message: "Nitrogen must be at least 0" }),
    potassium: z.coerce
        .number()
        .min(0, { message: "Potassium must be at least 0" }),
    phosphorus: z.coerce
        .number()
        .min(0, { message: "Phosphorus must be at least 0" }),
    calcium: z.coerce
        .number()
        .min(0, { message: "Calcium must be at least 0" }),
    magnesium: z.coerce
        .number()
        .min(0, { message: "Magnesium must be at least 0" }),
    sulfur: z.coerce.number().min(0, { message: "Sulfur must be at least 0" }),
    iron: z.coerce.number().min(0, { message: "Iron must be at least 0" }),
    manganese: z.coerce
        .number()
        .min(0, { message: "Manganese must be at least 0" }),
    longevity: z.coerce
        .number()
        .int()
        .positive({ message: "Longevity must be a positive integer" }),
    turfResponse: z.coerce
        .number()
        .int()
        .positive({ message: "Turf Response must be a positive integer" }),
});

export const HerbicideSchema = z.object({
    maxIndividualRate: z.coerce
        .number()
        .positive({ message: "Max Individual Rate must be positive" }),
    maxNoOfApplications: z.coerce.number().int().positive({
        message: "Max Number of Applications must be a positive integer",
    }),
});

export const typeInfoSchema = z.union([FertilizerSchema, HerbicideSchema]);

export type TypeInfo = z.infer<typeof typeInfoSchema>;

export const formSchema = z.object({
    generalInfo: generalInfoSchema,
    typeInfo: typeInfoSchema,
    formInfo: formInfoSchema,
});

export type FormFinal = z.infer<typeof formSchema>;

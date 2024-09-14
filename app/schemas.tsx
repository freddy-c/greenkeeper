import { Prisma } from "@prisma/client";
import { z } from "zod";

export const AddManufacturerSchema = z.object({
    name: z.string().min(1).trim(),
});

export const AddItemSchema = z.object({
    product: z.object({
        value: z.string().uuid(),
        label: z.string(),
    }),
    distributor: z.object({
        value: z.string().uuid(),
        label: z.string(),
    }),
    price: z.coerce.number().positive(),
    purchaseDate: z.string().date(),
    initialQuantity: z.coerce.number().positive(),
    currentQuantity: z.coerce.number().positive(),
});

export const ProductFormSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    manufacturer: z.object({
        value: z.string().uuid(),
        label: z.string(),
    }),
    type: z.enum([
        "Fertiliser",
        "WettingAgent",
        "Herbicide",
        "Fungicide",
        "GrowthRegulator",
    ]),
    form: z.enum(["Granular", "Liquid", "Soluble"]),

    // Fertiliser-only fields
    nitrogen: z.coerce
        .number()
        .min(0, { message: "Nitrogen must be at least 0" })
        .optional(),
    potassium: z.coerce
        .number()
        .min(0, { message: "Potassium must be at least 0" })
        .optional(),
    phosphorus: z.coerce
        .number()
        .min(0, { message: "Phosphorus must be at least 0" })
        .optional(),
    calcium: z.coerce
        .number()
        .min(0, { message: "Calcium must be at least 0" })
        .optional(),
    magnesium: z.coerce
        .number()
        .min(0, { message: "Magnesium must be at least 0" })
        .optional(),
    sulfur: z.coerce
        .number()
        .min(0, { message: "Sulfur must be at least 0" })
        .optional(),
    iron: z.coerce
        .number()
        .min(0, { message: "Iron must be at least 0" })
        .optional(),
    manganese: z.coerce
        .number()
        .min(0, { message: "Manganese must be at least 0" })
        .optional(),

    // Liquid-only field
    specificGravity: z.coerce
        .number()
        .min(0, { message: "Specific gravity must be at least 0" })
        .optional(),
});

export type ProductFormType = z.infer<typeof ProductFormSchema>;

const ApplicationItemSchema = z.object({
    itemId: z.string().uuid(),
    quantity: z.coerce.number().min(0, "Quantity must be non-negative"),
});

export const AddApplicationSchema = z.object({
    date: z.string().date(),
    sprayer: z.object({
        value: z.string().uuid(),
        label: z.string(),
    }),
    operator: z.string().min(1, "Operator name is required"),
    waterVolume: z.number().min(0, "Water volume must be non-negative"),
    temperature: z
        .number()
        .min(-50, "Temperature seems too low")
        .max(60, "Temperature seems too high"),
    windSpeed: z.number().min(0, "Wind speed must be non-negative"),
    observations: z
        .string()
        .max(160, {
            message: "Observations must not be longer than 160 characters.",
        })
        .optional(),
    items: z
        .array(
            z.object({
                itemId: z.object({
                    value: z.string().uuid(),
                    label: z.string(),
                }),
                applicationRate: z
                    .number()
                    .min(0, "Application rate must be non-negative"),
            })
        )
        .min(1, "At least one item is required"),
});

export const SprayCalculatorSchema = z.object({
    referencePressure: z.number().min(0, "Pressure must be non-negative"),
    referenceNozzleCapacity: z
        .number()
        .min(0, "Nozzle capacity must be non-negative"),
    forwardSpeed: z.number().min(0, "Forward speed must be non-negative"),
    waterVolume: z.number().min(0, "Water volume must be non-negative"),
    nozzleSpacing: z.number().min(0, "Nozzle spacing must be non-negative"),
    area: z.number().min(0, "Area must be non-negative"),
    sprayer: z.object({
        value: z.string().uuid(),
        label: z.string(),
    }),
    items: z
        .array(
            z.object({
                itemId: z.object({
                    value: z.string().uuid(),
                    label: z.string(),
                }),
                applicationRate: z
                    .number()
                    .min(0, "Application rate must be non-negative"),
            })
        )
        .min(1, "At least one item is required"),
});

export const AddSprayerSchema = z.object({
    name: z.string().min(1, "Sprayer name is required"),
    tankCapacity: z.number().positive(),
    nozzleSpacing: z.number().positive(),
});

const productWithManufacturer = Prisma.validator<Prisma.ProductDefaultArgs>()({
    include: { manufacturer: true },
});

export type ProductWithManufacturer = Prisma.ProductGetPayload<
    typeof productWithManufacturer
>;

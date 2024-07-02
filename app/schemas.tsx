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
    price: z.number().positive(),
    purchaseDate: z.string().date(),
    initialQuantity: z.number().positive(),
    currentQuantity: z.number().positive(),
});

export const AddProductSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    manufacturer: z.object({
        value: z.string().uuid(),
        label: z.string(),
    }),
});

const ApplicationItemSchema = z.object({
    itemId: z.string().uuid(),
    quantity: z.coerce.number().min(0, "Quantity must be non-negative"),
});

export const AddApplicationSchema = z.object({
    date: z.string().date(),
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
        .array(ApplicationItemSchema)
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

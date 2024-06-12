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

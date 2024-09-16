import { z } from "zod";

export const ApplicationSchema = z.object({
    date: z.string().date(),
    sprayer: z
        .object({
            value: z.string().uuid(),
            label: z.string(),
        })
        .optional(),
    operator: z.string().min(1, "Operator name is required"),
    method: z.enum(["Broadcast", "Spray"]),
    startTime: z.string().date(),
    endTime: z.string().date(),
    waterVolume: z
        .number()
        .min(0, "Water volume must be non-negative")
        .optional(),
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
    areas: z
        .array(
            z.object({
                managementZoneId: z.object({
                    value: z.string().uuid(),
                    label: z.string(),
                })
            })
        ).min(1, "At least one management zone must be treated"),
});

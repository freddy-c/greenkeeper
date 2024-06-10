"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "./client";
import { Item, Manufacturer } from "@prisma/client";
import { AddManufacturerSchema, AddItemSchema } from "./schemas";

const db = prisma;

export async function createManufacturer(
    data: z.infer<typeof AddManufacturerSchema>
): Promise<{
    success: boolean;
    manufacturer?: Manufacturer;
    issues?: {
        path: any;
        message: string;
    }[];
}> {
    const parsed = AddManufacturerSchema.safeParse(data);

    if (!parsed.success) {
        return {
            success: false,
            issues: parsed.error.issues.map((issue) => {
                return { path: issue.path, message: issue.message };
            }),
        };
    }

    const existingManufacturer = await db.manufacturer.findMany({
        where: {
            name: parsed.data.name,
        },
    });

    if (existingManufacturer.length > 0) {
        return {
            success: false,
            issues: [
                {
                    path: ["name"],
                    message: "This name is already in use",
                },
            ],
        };
    }

    try {
        const newManufacturer = await db.manufacturer.create({
            data: {
                name: parsed.data.name,
            },
        });

        revalidatePath("/");
        return {
            success: true,
            manufacturer: newManufacturer,
        };
    } catch (e) {
        return { success: false };
    }
}

export async function deleteManufacturer(
    prevState: {
        message: string;
    },
    formData: FormData
) {
    const schema = z.object({
        id: z.string().uuid(),
    });
    const parsed = schema.safeParse({
        id: formData.get("id"),
    });

    if (!parsed.success) {
        return { message: "Failed to delete manufacturer" };
    }

    const data = parsed.data;

    try {
        await db.manufacturer.delete({
            where: {
                id: data.id,
            },
        });

        revalidatePath("/");
        return { message: `Deleted manufacturer with id: ${data.id}` };
    } catch (e) {
        return { message: "Failed to delete manufacturer" };
    }
}

export async function createItem(data: z.infer<typeof AddItemSchema>): Promise<{
    success: boolean;
    item?: Item;
    issues?: {
        path: any;
        message: string;
    }[];
}> {
    const parsed = AddItemSchema.safeParse(data);

    if (!parsed.success) {
        return {
            success: false,
            issues: parsed.error.issues.map((issue) => {
                return { path: issue.path, message: issue.message };
            }),
        };
    }

    try {
        const newItem = await db.item.create({
            data: {
                product: {
                    connect: {
                        id: parsed.data.product.value,
                    },
                },
                distributor: {
                    connect: {
                        id: parsed.data.distributor.value,
                    },
                },
                price: parsed.data.price,
                purchaseDate: new Date(parsed.data.purchaseDate),
                initialQuantity: parsed.data.initialQuantity,
                currentQuantity: parsed.data.currentQuantity,
            },
        });

        revalidatePath("/");
        return {
            success: true,
            item: newItem,
        };
    } catch (e) {
        return { success: false };
    }
}

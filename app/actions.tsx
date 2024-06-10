"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "./client";
import { Manufacturer } from "@prisma/client";

const db = prisma;

const schema = z.object({
    name: z.string().min(1).trim(),
});

export async function createManufacturer(
    data: z.infer<typeof schema>
): Promise<{
    success: boolean;
    manufacturer?: Manufacturer;
    issues?: {
        path: any;
        message: string;
    }[];
}> {
    const parsed = schema.safeParse(data);

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

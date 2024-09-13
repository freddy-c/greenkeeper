"use server";

import { z } from "zod";
import { AddDistributorSchema } from "./schemas";
import { Distributor } from "@prisma/client";
import prisma from "../client";
import { revalidatePath } from "next/cache";

const db = prisma;

export async function createDistributor(
    data: z.infer<typeof AddDistributorSchema>
): Promise<{
    success: boolean;
    distributor?: Distributor;
    issues?: {
        path: any;
        message: string;
    }[];
}> {
    // Validate input using Zod schema
    const parsed = AddDistributorSchema.safeParse(data);

    if (!parsed.success) {
        return {
            success: false,
            issues: parsed.error.issues.map((issue) => {
                return { path: issue.path, message: issue.message };
            }),
        };
    }

    // Check if the distributor already exists
    const existingDistributor = await db.distributor.findMany({
        where: {
            name: parsed.data.name,
        },
    });

    if (existingDistributor.length > 0) {
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

    // Try creating the new distributor
    try {
        const newDistributor = await db.distributor.create({
            data: {
                name: parsed.data.name,
            },
        });

        revalidatePath("/"); // Revalidate the path to update UI after distributor creation
        return {
            success: true,
            distributor: newDistributor,
        };
    } catch (e) {
        return { success: false };
    }
}

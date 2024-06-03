"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const db = new PrismaClient();

const schema = z.object({
    name: z.string().min(1).trim(),
});

// export async function createManufacturer(
//     prevState: {
//         message: string;
//     },
//     formData: FormData
// ) {
//     const schema = z.object({
//         name: z.string().min(1),
//     });
//     const parsed = schema.safeParse({
//         name: formData.get("name"),
//     });

//     if (!parsed.success) {
//         return { message: "Failed to create manufacturer" };
//     }

//     const data = parsed.data;

//     try {
//         console.log("Creating manufacturer...");
//         const newManufacturer = await db.manufacturer.create({
//             data: {
//                 name: data.name,
//             },
//         });

//         revalidatePath("/");
//         return { message: `Added manufacturer ${data.name}` };
//     } catch (e) {
//         return { message: "Failed to create manufacturer" };
//     }
// }

export async function createManufacturer(
    data: z.infer<typeof schema>
): Promise<{
    success: boolean;
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
        console.log("Creating manufacturer...");
        const newManufacturer = await db.manufacturer.create({
            data: {
                name: parsed.data.name,
            },
        });

        revalidatePath("/");
        return { success: true };
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
        console.log("Deleting manufacturer...");
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

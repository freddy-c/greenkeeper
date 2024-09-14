"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "@/app/client";
import { AddItemSchema } from "@/app/schemas";

export async function editItem(
    itemId: string,
    data: z.infer<typeof AddItemSchema>
): Promise<{
    success: boolean;
    message?: string;
    item?: any;
    issues?: {
        path: any;
        message: string;
    }[];
}> {
    // Validate the incoming data with zod
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
        // Construct the data object for Prisma
        const itemData = {
            productId: parsed.data.product.value, // Use the UUID value
            distributorId: parsed.data.distributor.value, // Use the UUID value
            price: parsed.data.price,
            purchaseDate: new Date(parsed.data.purchaseDate), // Assuming the date is a string in 'yyyy-MM-dd' format
            initialQuantity: parsed.data.initialQuantity,
            currentQuantity: parsed.data.currentQuantity,
        };

        // Update the item in the database
        const updatedItem = await prisma.item.update({
            where: { id: itemId },
            data: itemData,
        });

        // Optionally revalidate the cache/path if needed
        revalidatePath("/inventory");

        return {
            success: true,
            item: updatedItem,
        };
    } catch (e) {
        console.log(e);
        return { success: false, message: "Failed to update item" };
    }
}

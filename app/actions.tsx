"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "./client";
import { FormType, Item, Manufacturer, ProductType } from "@prisma/client";
import {
    AddManufacturerSchema,
    AddItemSchema,
    AddProductSchema,
    AddSprayerSchema,
} from "./schemas";

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

// export async function createProduct(
//     data: z.infer<typeof AddProductSchema>
// ): Promise<{
//     success: boolean;
//     message?: string;
//     product?: any;
//     issues?: {
//         path: any;
//         message: string;
//     }[];
// }> {
//     const parsed = AddProductSchema.safeParse(data);

//     if (!parsed.success) {
//         return {
//             success: false,
//             issues: parsed.error.issues.map((issue) => {
//                 return { path: issue.path, message: issue.message };
//             }),
//         };
//     }

//     try {
//         const newProduct = await prisma.product.create({
//             data: {
//                 name: parsed.data.name,
//                 manufacturer: {
//                     connect: {
//                         id: parsed.data.manufacturer.value,
//                     },
//                 },
//             },
//         });

//         return {
//             success: true,
//             product: newProduct,
//         };
//     } catch (e) {
//         return { success: false, message: "Failed to create product" };
//     }
// }

export async function createSprayer(
    data: z.infer<typeof AddSprayerSchema>
): Promise<{
    success: boolean;
    message?: string;
    sprayer?: any;
    issues?: {
        path: any;
        message: string;
    }[];
}> {
    const parsed = AddSprayerSchema.safeParse(data);

    if (!parsed.success) {
        return {
            success: false,
            issues: parsed.error.issues.map((issue) => {
                return { path: issue.path, message: issue.message };
            }),
        };
    }

    try {
        const newSprayer = await db.equipment.create({
            data: {
                name: parsed.data.name,
                type: "Sprayer",
                sprayer: {
                    create: {
                        tankCapacity: parsed.data.tankCapacity,
                        nozzleSpacing: parsed.data.nozzleSpacing,
                    },
                },
            },
        });

        return {
            success: true,
            sprayer: newSprayer,
        };
    } catch (e) {
        console.log(e);
        // return { success: false, message: "Failed to create sprayer" };
        return { success: false, message: "Failed to create sprayer" };
    }
}

// export async function createProduct(
//     data: formSchema
// ): Promise<{
//     success: boolean;
//     message?: string;
//     product?: any;
// }> {
//     // Validate the data with Zod schema
//     const parsed = productSchema.safeParse(data);

//     if (!parsed.success) {
//         return {
//             success: false,
//             message: parsed.error.errors.map((e) => e.message).join(", "),
//         };
//     }

//     const { basicProductInfo, productDetails, formSpecific } = parsed.data;
//     const { name, manufacturer, type, form } = basicProductInfo;
//     const productType: ProductType = type as ProductType;
//     const formType: FormType = form as FormType;

//     try {
//         // Create the product
//         const product = await prisma.product.create({
//             data: {
//                 name,
//                 manufacturerId: manufacturer.value,
//                 // type: productType,
//                 productType: productType,
//                 form: formType,
//             },
//         });

//         console.log(product);

//         // Handle specific product type data
//         switch (productType) {
//             case "Fertilizer":
//                 const fertilizerData =
//                     fertilizerFormSchema.parse(productDetails);
//                 await prisma.fertilizer.create({
//                     data: {
//                         productId: product.id,
//                         ...fertilizerData,
//                     },
//                 });
//                 break;

//             // Add other product types if needed
//         }

//         // Handle form specific data
//         switch (formType) {
//             case "Liquid":
//                 const liquidData = liquidFormSchema.parse(formSpecific);
//                 await prisma.liquid.create({
//                     data: {
//                         productId: product.id,
//                         specificGravity: liquidData.specificGravity,
//                         waterRateMax: liquidData.maxWaterRate,
//                         waterRateMin: liquidData.minWaterRate,
//                     },
//                 });
//                 break;
//             case "Granular":
//                 const granularData = granularFormSchema.parse(formSpecific);
//                 await prisma.granular.create({
//                     data: {
//                         productId: product.id,
//                         granuleSizeMax: granularData.granuleSizeMax,
//                         granuleSizeMin: granularData.granuleSizeMin,
//                         minCuttingHeight: granularData.minCuttingHeight,
//                         sgn: granularData.sgn,
//                     },
//                 });
//                 break;
//             case "Soluble":
//                 const solubleData = solubleFormSchema.parse(formSpecific);
//                 await prisma.soluble.create({
//                     data: {
//                         productId: product.id,
//                         waterRateMax: solubleData.waterRateMax,
//                         waterRateMin: solubleData.waterRateMin,
//                     },
//                 });
//                 break;
//         }

//         return {
//             success: true,
//             product,
//         };
//     } catch (error) {
//         console.log(error);
//         return {
//             success: false,
//         };
//     }
// }

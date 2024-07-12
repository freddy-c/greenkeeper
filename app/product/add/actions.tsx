"use server";

import { FormType, ProductType } from "@prisma/client";
import {
    FertilizerSchema,
    FormFinal,
    formSchema,
    GranularSchema,
    LiquidSchema,
    SolubleSchema,
} from "./schemas";
import prisma from "@/app/client";

export async function createProduct(data: FormFinal): Promise<{
    success: boolean;
    message?: string;
    product?: any;
}> {
    // Validate the data with Zod schema
    const parsed = formSchema.safeParse(data);

    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.errors.map((e) => e.message).join(", "),
        };
    }

    const { generalInfo, typeInfo, formInfo } = parsed.data;
    const { name, manufacturer, type, form } = generalInfo;
    const productType: ProductType = type as ProductType;
    const formType: FormType = form as FormType;

    try {
        // Create the product
        const product = await prisma.product.create({
            data: {
                name,
                manufacturerId: manufacturer.value,
                type: productType,
                form: formType,
            },
        });

        console.log(product);

        // Handle specific product type data
        switch (productType) {
            case "Fertilizer":
                const fertilizerData = FertilizerSchema.parse(typeInfo);
                await prisma.fertilizer.create({
                    data: {
                        productId: product.id,
                        ...fertilizerData,
                    },
                });
                break;

            // Add other product types if needed
        }

        // Handle form specific data
        switch (formType) {
            case "Liquid":
                const liquidData = LiquidSchema.parse(formInfo);
                await prisma.liquid.create({
                    data: {
                        productId: product.id,
                        specificGravity: liquidData.specificGravity,
                        waterRateMax: liquidData.maxWaterRate,
                        waterRateMin: liquidData.minWaterRate,
                    },
                });
                break;
            case "Granular":
                const granularData = GranularSchema.parse(formInfo);
                await prisma.granular.create({
                    data: {
                        productId: product.id,
                        granuleSizeMax: granularData.granuleSizeMax,
                        granuleSizeMin: granularData.granuleSizeMin,
                        minCuttingHeight: granularData.minCuttingHeight,
                        sgn: granularData.sgn,
                    },
                });
                break;
            case "Soluble":
                const solubleData = SolubleSchema.parse(formInfo);
                await prisma.soluble.create({
                    data: {
                        productId: product.id,
                        waterRateMax: solubleData.waterRateMax,
                        waterRateMin: solubleData.waterRateMin,
                    },
                });
                break;
        }

        return {
            success: true,
            product,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
        };
    }
}

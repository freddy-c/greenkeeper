import { Manufacturer } from "@prisma/client";
import prisma from "@/app/client";
import ProductForm from "../../product-form";
import { ProductWithManufacturer } from "@/app/schemas";

export default async function EditPage({ params }: { params: any }) {
    const { id } = params;

    const manufacturers: Manufacturer[] = await prisma.manufacturer.findMany();

    const product: ProductWithManufacturer =
        await prisma.product.findUniqueOrThrow({
            where: {
                id,
            },
            include: {
                manufacturer: true,
            },
        });

    return (
        <div>
            <ProductForm manufacturers={manufacturers} product={product} />
        </div>
    );
}

import { Distributor, Manufacturer, Product } from "@prisma/client";
import prisma from "@/app/client";
import ProductForm from "../../product-form";
import { ProductWithManufacturer } from "@/app/schemas";

export default async function EditPage({ params }: { params: any }) {
    const { id } = params;

    const manufacturers: Manufacturer[] = await prisma.manufacturer.findMany();

    // const product: Product = await prisma.product.findFirstOrThrow();

    const product: ProductWithManufacturer =
        await prisma.product.findUniqueOrThrow({
            where: {
                // id: "bc7905cf-67cb-42f6-baba-9791f53bdad3",
                id,
            },
            include: {
                manufacturer: true,
            },
        });

    return (
        <div>
            {/* {JSON.stringify(product)} */}
            <ProductForm manufacturers={manufacturers} product={product} />
        </div>
    );
}

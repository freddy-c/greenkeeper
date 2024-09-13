import { Distributor, Manufacturer, Product } from "@prisma/client";
import prisma from "@/app/client";
import ProductForm from "../product-form";
import { ProductWithManufacturer } from "@/app/schemas";

export default async function AddPage() {
    const manufacturers: Manufacturer[] = await prisma.manufacturer.findMany();

    return (
        <div>
            <ProductForm manufacturers={manufacturers} />
        </div>
    );
}

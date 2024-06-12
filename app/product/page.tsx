import { Manufacturer } from "@prisma/client";
import prisma from "../client";
import AddProductForm from "./add-product-form";

export default async function ProductPage() {
    const manufacturers: Manufacturer[] = await prisma.manufacturer.findMany();

    return (
        <div>
            <h1 className="text-lg font-semibold">Products</h1>
            <AddProductForm manufacturers={manufacturers} />
        </div>
    );
}

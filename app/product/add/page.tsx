import { Manufacturer } from "@prisma/client";
import AddProductForm from "./add-product-form";
import prisma from "@/app/client";

export default async function AddPage() {
    const manufacturers: Manufacturer[] = await prisma.manufacturer.findMany();

    return (
        <div className="max-w-lg mx-auto">
            <AddProductForm manufacturers={manufacturers} />
        </div>
    );
}

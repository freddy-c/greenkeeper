import { Manufacturer, Product } from "@prisma/client";
import prisma from "../client";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default async function ProductPage() {
    const manufacturers: Manufacturer[] = await prisma.manufacturer.findMany();
    const products: Product[] = await prisma.product.findMany();

    return (
        <div>
            <h1 className="text-lg font-semibold">Products</h1>
            <ul className="mt-4">
                {products.map((product) => (
                    <li key={product.id} className="mb-2 p-2 border-b">
                        <h2 className="text-md font-medium">{product.name}</h2>
                        <p>Type: {product.type}</p>
                        <p>Form: {product.form}</p>

                        {/* Edit button linking to the edit page */}
                        <Link href={`/product/edit/${product.id}`}>
                            <Button variant="link">Edit</Button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

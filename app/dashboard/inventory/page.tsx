import Link from "next/link";
import prisma from "@/app/client";
import { ItemWithProductDistributor } from "./schemas";

import { Button } from "@/components/ui/button";

export default async function InventoryPage() {
    const items: ItemWithProductDistributor[] = await prisma.item.findMany({
        include: {
            product: true, // Include related product details
            distributor: true, // Include related distributor details
        },
    });

    return (
        <div>
            <h1>Inventory Page!</h1>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <strong>{item.product.name}</strong> - Distributed by{" "}
                        {item.distributor.name}, Price: £{item.price.toFixed(2)}
                        , Quantity: {item.currentQuantity}
                        {/* Edit button */}
                        <Link href={`/dashboard/inventory/edit/${item.id}`}>
                            <Button variant="link">Edit</Button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

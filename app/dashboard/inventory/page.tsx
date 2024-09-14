import { Item } from "@prisma/client";
import prisma from "@/app/client";
import { ItemWithProductDistributor } from "./schemas";

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
                    </li>
                ))}
            </ul>
        </div>
    );
}

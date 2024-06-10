import { Distributor, Product } from "@prisma/client";
import AddItemForm from "./add-item-form";
import prisma from "../client";

export default async function InventoryPage() {
    const products: Product[] = await prisma.product.findMany();
    const distributors: Distributor[] = await prisma.distributor.findMany();

    return (
        <div>
            <h1 className="text-lg font-semibold">Inventory</h1>
            <AddItemForm products={products} distributors={distributors} />
        </div>
    );
}

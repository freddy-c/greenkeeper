import { Distributor, Product } from "@prisma/client";
import ItemForm from "../../item-form";
import prisma from "@/app/client";
import { ItemWithProductDistributor } from "../../schemas";

export default async function EditPage({ params }: { params: any }) {
    const { id } = params;

    const products: Product[] = await prisma.product.findMany();
    const distributors: Distributor[] = await prisma.distributor.findMany();

    const item: ItemWithProductDistributor =
        await prisma.item.findUniqueOrThrow({
            where: {
                id,
            },
            include: {
                product: true,
                distributor: true,
            },
        });

    return (
        <div>
            <ItemForm
                products={products}
                distributors={distributors}
                item={item}
            />
        </div>
    );
}

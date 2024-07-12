import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import AddApplicationForm from "./add-application-form";
import prisma from "@/app/client";
import { ItemsWithProduct, Sprayer, toSprayer } from "@/app/types";

export default async function AddApplicationPage() {
    const sprayerWithEquipment = await prisma.sprayer.findMany({
        include: {
            equipment: true,
        },
    });

    const sprayers: Sprayer[] = sprayerWithEquipment.map(toSprayer);

    const items: ItemsWithProduct[] = await prisma.item.findMany({
        include: {
            product: true,
        },
    });

    const groupProduct = await prisma.item.groupBy({
        by: ["productId"],

        _sum: {
            currentQuantity: true,
        },
    });

    const distinct = await prisma.item.findMany({
        distinct: ["productId"],
        select: {
            productId: true,
            product: {
                select: {
                    name: true,
                },
            },
        },
    });

    const combinedResult = distinct.map((product) => {
        const foundGroup = groupProduct.find(
            (group) => group.productId === product.productId
        );
        return {
            productId: product.productId,
            name: product.product.name,
            totalQuantity: foundGroup ? foundGroup._sum.currentQuantity : 0,
        };
    });

    return (
        <div className="grid max-w-full-lg gap-4">
            {JSON.stringify(combinedResult)}
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Application Details</CardTitle>
                            <CardDescription>
                                Lipsum dolor sit amet, consectetur adipiscing
                                elit
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <AddApplicationForm
                                    sprayers={sprayers}
                                    items={items}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

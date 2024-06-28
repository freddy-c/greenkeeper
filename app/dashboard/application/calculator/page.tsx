import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ApplicationCalculator from "./application-calculator";
import { Item, Prisma } from "@prisma/client";
import prisma from "@/app/client";

type ItemsWithProduct = Prisma.ItemGetPayload<{
    include: {
        product: true;
    };
}>;

export default async function CalculatorPage() {
    const items: ItemsWithProduct[] = await prisma.item.findMany({
        include: {
            product: true,
        },
    });

    return (
        <div className="grid max-w-full-lg gap-4">
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Application Calculator</CardTitle>
                            <CardDescription>
                                Lipsum dolor sit amet, consectetur adipiscing
                                elit
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <ApplicationCalculator items={items} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

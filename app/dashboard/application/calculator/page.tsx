import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ApplicationCalculator from "./application-calculator";
import { Prisma } from "@prisma/client";
import prisma from "@/app/client";
import { ItemsWithProduct, Sprayer, toSprayer } from "@/app/types";

export default async function CalculatorPage() {
    const items = [
        {
            "id": 1,
            "product": {
                "id": "1",
                "name": "H2Pro Trismart"
            }
        }
    ]
    const sprayers = [
        {
            "id": "1",
            "name": "Boom Sprayer"
        },
        {
            "id": "2",
            "name": "Knapsack"
        }
    ]
    // const items: ItemsWithProduct[]; = await prisma.item.findMany({
    //     include: {
    //         product: true,
    //     },
    // });

    // const sprayerWithEquipment = await prisma.sprayer.findMany({
    //     include: {
    //         equipment: true,
    //     },
    // });

    // const sprayers: Sprayer[] = sprayerWithEquipment.map(toSprayer);

    return (
        <div className="grid max-w-full-lg gap-4">
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Application Calculator</CardTitle>
                            <CardDescription>
                            This spray calculator determines the required nozzle output (L/min) to apply a product at the specified rate and water volume. It also calculates the sprayer pressure needed to achieve this output.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <ApplicationCalculator
                                    items={items}
                                    sprayers={sprayers}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Distributor, Product } from "@prisma/client";
import ItemForm from "../item-form";
import prisma from "../../../client";
import { ChevronLeft } from "lucide-react";

export default async function AddInventoryPage() {
    const products: Product[] = await prisma.product.findMany();
    const distributors: Distributor[] = await prisma.distributor.findMany();

    return (
        <div className="grid max-w-full-lg gap-4">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="h-7 w-7">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    New Item
                </h1>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button variant="outline" size="sm">
                        Discard
                    </Button>
                    <Button size="sm">Save Item</Button>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Item Details</CardTitle>
                            <CardDescription>
                                Lipsum dolor sit amet, consectetur adipiscing
                                elit
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <ItemForm
                                    products={products}
                                    distributors={distributors}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

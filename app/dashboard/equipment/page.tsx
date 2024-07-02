import prisma from "@/app/client";
import { Equipment } from "@prisma/client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function EquipmentPage() {
    const equipment: Equipment[] = await prisma.equipment.findMany();

    return (
        <>
            <h1>Equipment Page</h1>
            <div className="space-y-8">
                {equipment.map((item) => (
                    <div key={item.id}>
                        <h2 className="font-bold">{item.name}</h2>
                        <p>{item.type}</p>
                    </div>
                ))}
            </div>
            <Link
                className={buttonVariants({ variant: "outline" })}
                href="/dashboard/equipment/add/sprayer"
            >
                Add Sprayer
            </Link>
        </>
    );
}

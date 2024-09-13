import { Distributor } from "@prisma/client";
import prisma from "../client";

export default async function DistributorPage() {
    const distributors: Distributor[] = await prisma.distributor.findMany();

    return (
        <div>
            <h1>Distributors</h1>
            <ul>
                {distributors.map((distributor) => (
                    <li key={distributor.id}>{distributor.name}</li>
                ))}
            </ul>
        </div>
    );
}

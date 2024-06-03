import { PrismaClient } from "@prisma/client";
import DeleteForm from "./delete-form";
import AddForm from "./add-form";

const db = new PrismaClient();

export default async function Home() {
    const manufacturers = await db.manufacturer.findMany();

    return (
        <div>
            <h1 className="text-lg font-semibold">Manufacturer List</h1>
            <ul>
                {manufacturers.map((manufacturer) => (
                    <li key={manufacturer.id} className="mb-4">
                        <h2>{manufacturer.name}</h2>
                        <DeleteForm manufacturerId={manufacturer.id} />
                    </li>
                ))}
            </ul>
            <AddForm />
        </div>
    );
}

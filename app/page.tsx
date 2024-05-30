import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export default async function Home() {
  const products = await db.product.findMany();

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.manufacturerId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

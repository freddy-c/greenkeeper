import { Prisma } from "@prisma/client";

const itemWithProductDistributor = Prisma.validator<Prisma.ItemDefaultArgs>()({
    include: { product: true, distributor: true },
});

export type ItemWithProductDistributor = Prisma.ItemGetPayload<
    typeof itemWithProductDistributor
>;

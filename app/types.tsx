import { Prisma } from "@prisma/client";
import { Sprayer as SprayerDB, Equipment } from "@prisma/client";

export type Sprayer = Omit<SprayerDB & Equipment, "type">;

const sprayerWithEquipment = Prisma.validator<Prisma.SprayerDefaultArgs>()({
    include: {
        equipment: true,
    },
});

export type SprayerWithEquipment = Prisma.SprayerGetPayload<
    typeof sprayerWithEquipment
>;

export function toSprayer(a: SprayerWithEquipment): Sprayer {
    return {
        id: a.id,
        tankCapacity: a.tankCapacity,
        nozzleSpacing: a.nozzleSpacing,
        equipmentId: a.equipmentId,
        name: a.equipment.name,
    };
}

export type ItemsWithProduct = Prisma.ItemGetPayload<{
    include: {
        product: true;
    };
}>;

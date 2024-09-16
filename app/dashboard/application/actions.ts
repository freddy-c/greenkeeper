"use server";

import prisma from "@/app/client";
import { ApplicationSchema } from "./schemas";
import { revalidatePath } from "next/cache";

export async function createApplication(data: any): Promise<{
    success: boolean;
    message?: string;
    application?: any;
    issues?: {
        path: any;
        message: string;
    }[];
}> {
    const parsed = ApplicationSchema.safeParse(data);

    if (!parsed.success) {
        return {
            success: false,
            issues: parsed.error.issues.map((issue) => {
                return { path: issue.path, message: issue.message };
            }),
        };
    }

    try {
        // Extract the date from application.date and time from startTime and endTime
        const applicationDate = new Date(parsed.data.date);

        const startTime = new Date(parsed.data.startTime);
        const startDateTime = new Date(applicationDate);
        startDateTime.setHours(
            startTime.getHours(),
            startTime.getMinutes(),
            startTime.getSeconds()
        );

        const endTime = new Date(parsed.data.endTime);
        const endDateTime = new Date(applicationDate);
        endDateTime.setHours(
            endTime.getHours(),
            endTime.getMinutes(),
            endTime.getSeconds()
        );

        // Construct the data object for Prisma
        const applicationData = {
            date: applicationDate,
            sprayerId: parsed.data.sprayer?.value || null, // Handle optional sprayer
            operator: parsed.data.operator,
            method: parsed.data.method,
            startTime: startDateTime, // Combined date and time for start
            endTime: endDateTime, // Combined date and time for end
            waterVolume: parsed.data.waterVolume || null,
            temperature: parsed.data.temperature,
            windSpeed: parsed.data.windSpeed,
            observations: parsed.data.observations || "", // Optional observations
            ApplicationItems: {
                create: parsed.data.items.map((item: any) => ({
                    quantity: 0, // This can be calculated based on the rate/area logic
                    item: { connect: { id: item.itemId.value } }, // Add item connection
                })),
            },
            areasTreated: {
                connect: parsed.data.areas.map((area: any) => ({
                    id: area.managementZoneId.value,
                })),
            },
        };

        // Create the application in the database
        const newApplication = await prisma.application.create({
            data: applicationData,
        });

        revalidatePath("/application");

        return {
            success: true,
            application: newApplication,
        };
    } catch (e) {
        console.log(e);
        return { success: false, message: "Failed to create application" };
    }
}

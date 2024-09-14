import { z } from "zod";

export const AddDistributorSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

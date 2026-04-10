import { z }  from "zod";

export const todoSchema = z.object({
    id: z.number(),
    title: z.string().min(3),
})
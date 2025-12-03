import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tickets } from "@/db/schema";
import { z } from "zod";

export const insertTicketSchema = createInsertSchema(tickets, {
    id: z.union([z.number(), z.literal("(New)")]),
    title: (field) => field.min(1, "Title is required"),
    description: (field) => field.min(1, "Description is required"),
    tech: (field) => field.min(1, "Tech is required") 
});

export const selectTicketSchema = createSelectSchema(tickets);

export type insertTicketSchemaType = z.infer<typeof insertTicketSchema>;
export type selectTicketSchemaType = z.infer<typeof selectTicketSchema>;



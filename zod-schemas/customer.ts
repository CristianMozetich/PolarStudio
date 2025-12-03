import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schema";
import { z } from "zod";

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (field) => field.min(1, "First name is required"),
  lastName: (field) => field.min(1, "Last name is required"),
  address1: (field) => field.min(1, "Address1 is required"),
  city: (field) => field.min(1, "City is required"),
  state: (field) => field.length(2, "State must be 2 characters"),
  email: (field) => field.email("Invalid email"),
  zip: (field) => field.regex(/^\d{5}(-\d{4})?$/, "Invalid zip code"),
  phone: (field) => field.regex(/^\d{3}-\d{3}-\d{4}$/, "Invalid phone number"),
});

export type InsertCustomerSchemaType = z.infer<typeof insertCustomerSchema>;
export type SelectCustomerSchemaType = z.infer<typeof selectCustomerSchema>;


export const selectCustomerSchema = createSelectSchema(customers);

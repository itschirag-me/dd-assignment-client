import { z } from "zod";

export const createBrandSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  website: z.string().url({ message: "Invalid website URL" }),
  email: z.string().email({ message: "Invalid email address" }),
});

export type CreateBrandFormSchema = z.infer<typeof createBrandSchema>;

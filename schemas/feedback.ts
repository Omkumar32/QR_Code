import { z } from "zod";

export const feedbackFormSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Must be a valid 10-digit Indian phone number (starting with 6, 7, 8, or 9)"),
  reason: z.string().min(1, "Purpose of visit is required"),
  rating: z.number().min(1).max(5).optional().default(5),
  message: z.string().optional().default("Visitor Registration"),
});

export const adminLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type FeedbackFormInput = z.infer<typeof feedbackFormSchema>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

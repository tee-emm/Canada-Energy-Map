import { z } from "zod";

export const impactSchema = z.object({
  warmth: z.number().optional(),
  reliability: z.number().optional(),
  affordability: z.number().optional(),
  agency: z.number().optional(),
});

export type Impact = z.infer<typeof impactSchema>;

import { z } from "zod";

export const copyStatusSchema = z.object({
  message: z.string(),
  type: z.union([z.literal("success"), z.literal("error"), z.literal("idle")]),
});

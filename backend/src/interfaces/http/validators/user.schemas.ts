import { z } from "zod";

export const UpdateUserRequestBodySchema = z.object({
  email: z.string().email().optional(),
});

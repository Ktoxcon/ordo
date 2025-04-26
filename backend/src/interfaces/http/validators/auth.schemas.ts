import { z } from "zod";

export const SignUpRequestBodySchema = z.object({
  email: z.string().nonempty().email(),
});

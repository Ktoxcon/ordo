import { z } from "zod";

export const CreateUserRequestBodySchema = z.object({
  email: z.string().email(),
  name: z.string().nonempty(),
  lastName: z.string().nonempty(),
});

export const EditUserRequestBodySchema = CreateUserRequestBodySchema.partial();

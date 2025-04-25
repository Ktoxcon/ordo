import { z } from "zod";

export const SendAuthLinkBodySchema = z.object({
  email: z.string().nonempty().email(),
});

export const VerifyAuthLinkBodySchema = z.object({
  token: z.string().nonempty(),
});

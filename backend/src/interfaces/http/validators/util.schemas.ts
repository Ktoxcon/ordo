import { z } from "zod";

export const IdParamSchema = z.string().nonempty();

import { z } from "zod";

export const IdParamSchema = z.string().nonempty();

export const QuantitySchema = z
  .string()
  .nonempty()
  .transform((quantityString) => Number(quantityString));

export const StatusSchema = z
  .string()
  .nonempty()
  .transform((statusString) => {
    const status = statusString === "true" ? true : false;
    return status;
  });

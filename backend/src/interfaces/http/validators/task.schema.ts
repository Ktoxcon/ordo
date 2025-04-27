import z from "zod";

export const CreateTaskRequestBodySchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
});

export const UpdateTaskRequestBodySchema = CreateTaskRequestBodySchema.extend({
  completed: z.enum(["true", "false"]).transform((status) => status === "true"),
}).partial();

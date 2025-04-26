import { TaskStatusZodEnum } from "@ordo/shared/constants/task-status";
import z from "zod";

export const CreateTaskRequestBodySchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
});

export const UpdateTaskRequestBodySchema = CreateTaskRequestBodySchema.extend({
  status: z.enum(TaskStatusZodEnum),
}).partial();

import { TaskService } from "@ordo/application/task/task.service";
import { IdParamSchema } from "@ordo/interfaces/http/validators/util.schemas";
import { TaskStatus } from "@ordo/shared/constants/task-status";
import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ZodError } from "zod";
import {
  CreateTaskRequestBodySchema,
  UpdateTaskRequestBodySchema,
} from "../validators/task.schema";

@injectable()
export class TaskController {
  constructor(@inject(TaskService) private taskService: TaskService) {
    this.createTask = this.createTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.findTaskById = this.findTaskById.bind(this);
    this.listTasksByUserId = this.listTasksByUserId.bind(this);
  }

  async createTask(request: Request, response: Response) {
    try {
      const userId = response.locals.session.data.id;
      const taskCreationPayload = CreateTaskRequestBodySchema.parse(
        request.body
      );

      const newTask = await this.taskService.createTask({
        ...taskCreationPayload,
        userId,
        status: TaskStatus.PENDING,
      });

      response.send({ success: true, data: newTask });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
        return;
      }

      response
        .status(500)
        .send({ success: false, error: "Internal server error." });
    }
  }

  async findTaskById(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);

      const task = await this.taskService.findTaskById(id);

      if (!task) {
        response.status(404).send({ success: false, error: "Task not found." });
        return;
      }

      response.send({ success: true, data: task });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
        return;
      }

      response
        .status(500)
        .send({ success: false, error: "Internal server error." });
    }
  }

  async listTasksByUserId(_request: Request, response: Response) {
    try {
      const userId = response.locals.session.data.id;
      const tasks = await this.taskService.listTasksByUserId(userId);

      response.send({ success: true, data: tasks });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
        return;
      }

      response
        .status(500)
        .send({ success: false, error: "Internal server error." });
    }
  }

  async updateTask(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);
      const taskUpdatePayload = UpdateTaskRequestBodySchema.parse(request.body);

      const task = await this.taskService.findTaskById(id);

      if (!task) {
        response.status(404).send({ success: false, error: "Task not found." });
        return;
      }

      await this.taskService.updateTask(id, taskUpdatePayload);

      response.send({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
        return;
      }

      response
        .status(500)
        .send({ success: false, error: "Internal server error." });
    }
  }
}

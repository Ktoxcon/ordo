import { container } from "@ordo/di/container";
import { AuthMiddleware } from "@ordo/interfaces/http/middleware/auth.middleware";
import { UrlEncodedMiddleware } from "@ordo/interfaces/http/middleware/url-encoded.middleware";
import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

const controller: TaskController = container.get(TaskController);

export const TaskRoutes = Router();

TaskRoutes.use(UrlEncodedMiddleware);
TaskRoutes.post("/", AuthMiddleware, controller.createTask);
TaskRoutes.patch("/:id", AuthMiddleware, controller.updateTask);
TaskRoutes.get("/:id", AuthMiddleware, controller.findTaskById);
TaskRoutes.get("/", AuthMiddleware, controller.listTasksByUserId);

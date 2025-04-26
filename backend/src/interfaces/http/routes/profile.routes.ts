import { container } from "@ordo/di/container";
import { UserController } from "@ordo/interfaces/http/controllers/user.controller";
import { AuthMiddleware } from "@ordo/interfaces/http/middleware/auth.middleware";
import { UrlEncodedMiddleware } from "@ordo/interfaces/http/middleware/url-encoded.middleware";
import { Router } from "express";

const controller: UserController = container.get(UserController);

export const ProfileRoutes = Router();

ProfileRoutes.use(UrlEncodedMiddleware);
ProfileRoutes.patch("/", AuthMiddleware, controller.updateUser);
ProfileRoutes.get("/:id", AuthMiddleware, controller.findUserById);

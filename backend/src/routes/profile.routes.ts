import { UsersController } from "@ordo/controllers/users.controller";
import { AuthMiddleware } from "@ordo/middleware/auth.middleware";
import { UrlEncodedMiddleware } from "@ordo/middleware/url-encoded.middleware";
import { Router } from "express";

export const ProfileRoutes = Router();

ProfileRoutes.use(UrlEncodedMiddleware);

ProfileRoutes.get("/:id", AuthMiddleware, UsersController.getUser);
ProfileRoutes.patch("/", AuthMiddleware, UsersController.updateUser);

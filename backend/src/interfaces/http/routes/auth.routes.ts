import { container } from "@ordo/di/container";
import { AuthController } from "@ordo/interfaces/http/controllers/auth.controller";
import { UrlEncodedMiddleware } from "@ordo/interfaces/http/middleware/url-encoded.middleware";
import { Router } from "express";

const controller = container.get(AuthController);

export const AuthRoutes = Router();

AuthRoutes.use(UrlEncodedMiddleware);
AuthRoutes.post("/sign-in", controller.signIn);
AuthRoutes.post("/sign-up", controller.signUp);
AuthRoutes.post("/sign-out", controller.signOut);

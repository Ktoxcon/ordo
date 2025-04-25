import { AuthController } from "@ordo/controllers/auth.controller";
import { UrlEncodedMiddleware } from "@ordo/middleware/url-encoded.middleware";
import { Router } from "express";

export const AuthRoutes = Router();

AuthRoutes.use(UrlEncodedMiddleware);

AuthRoutes.post("/verify", AuthController.verify);
AuthRoutes.post("/signout", AuthController.signOut);
AuthRoutes.post("/magic-link", AuthController.sendMagicLink);

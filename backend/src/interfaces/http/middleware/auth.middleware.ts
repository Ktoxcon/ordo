import AppConfig from "@ordo/config/app.config";
import type { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function AuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { session } = request.cookies;

    if (!session) {
      response
        .status(401)
        .send({ success: false, error: "Unauthorized Request" });
      return;
    }

    const decodedSession = await verify(session, AppConfig.sessionSecret);

    response.locals.session = decodedSession;

    next();
  } catch (error) {
    if (error instanceof Error) {
      response.status(401).send({ success: false, error: error.message });
    }
  }
}

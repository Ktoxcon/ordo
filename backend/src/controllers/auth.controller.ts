import AppConfig from "@ordo/config/app.config";
import { DayInMilliseconds } from "@ordo/libs/constants/time";
import { sendAuthLinkEmail } from "@ordo/libs/emails";
import { encodeData } from "@ordo/libs/encode";
import {
  SendAuthLinkBodySchema,
  VerifyAuthLinkBodySchema,
} from "@ordo/libs/validators/auth.schemas";
import type { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { ZodError } from "zod";

export const AuthController = {
  async sendMagicLink(request: Request, response: Response) {
    try {
      const { email } = SendAuthLinkBodySchema.parse(request.body);

      const userExists = await Promise.resolve({});

      if (!userExists) {
        //Create User
      }

      const token = sign(
        {
          userId: "",
        },
        AppConfig.sessionSecret,
        {
          expiresIn: "24h",
        }
      );

      await sendAuthLinkEmail({ email, token });

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
  },

  async verify(request: Request, response: Response) {
    try {
      const { token } = VerifyAuthLinkBodySchema.parse(request.body);

      await verify(token, AppConfig.sessionSecret);

      const user = await Promise.resolve({});

      if (!user) {
        response.status(404).send({
          success: false,
          error: "User not found.",
        });

        return;
      }

      const session = sign(
        {
          data: {},
        },
        AppConfig.sessionSecret,
        {
          expiresIn: "24h",
        }
      );

      response.cookie("session", session, {
        sameSite: true,
        httpOnly: true,
        maxAge: DayInMilliseconds,
      });

      response.cookie("profile", encodeData({ ...user }), {
        sameSite: true,
        maxAge: DayInMilliseconds,
      });

      response.send({ success: true });
    } catch (error: unknown) {
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
  },

  async signOut(_request: Request, response: Response) {
    try {
      response.clearCookie("session");
      response.clearCookie("profile");

      response.send({ success: true });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";

      response.status(500).send({ success: false, error: errorMessage });
    }
  },
};

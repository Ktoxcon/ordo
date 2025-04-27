import { UserService } from "@ordo/application/user/user.service";
import AppConfig from "@ordo/config/app.config";
import { SignUpRequestBodySchema } from "@ordo/interfaces/http/validators/auth.schemas";
import { DayInMilliseconds } from "@ordo/shared/constants/time";
import { encodeData } from "@ordo/shared/encode";
import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { sign } from "jsonwebtoken";
import { ZodError } from "zod";

@injectable()
export class AuthController {
  constructor(
    @inject(UserService)
    private userService: UserService
  ) {
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  async signUp(request: Request, response: Response) {
    try {
      const { email } = SignUpRequestBodySchema.parse(request.body);

      const userExists = await this.userService.findUserByEmail(email);

      if (userExists) {
        response.status(400).send({
          success: false,
          error: "User already exists.",
        });

        return;
      }

      await this.userService.createUser({ email });

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

  async signIn(request: Request, response: Response) {
    try {
      const { email } = SignUpRequestBodySchema.parse(request.body);

      const user = await this.userService.findUserByEmail(email);

      if (!user) {
        response.status(404).send({
          success: false,
          error: "User not found.",
        });

        return;
      }

      const session = sign(
        {
          data: { user },
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

      response.cookie("profile", encodeData(user), {
        sameSite: true,
        maxAge: DayInMilliseconds,
      });

      response.send({ success: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

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
  }
}

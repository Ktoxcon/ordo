import { UserService } from "@ordo/application/user/user.service";
import { UpdateUserRequestBodySchema } from "@ordo/interfaces/http/validators/user.schemas";
import { IdParamSchema } from "@ordo/interfaces/http/validators/util.schemas";
import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ZodError } from "zod";

@injectable()
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  async findUserById(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);

      const user = await this.userService.findUserById(id);

      if (!user) {
        response.status(404).send({ success: false, error: "User not found." });
        return;
      }

      response.send({ success: true, data: user });
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

  async updateUser(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);
      const userUpdatePayload = UpdateUserRequestBodySchema.parse(request.body);

      console.debug(id, userUpdatePayload);

      const user = await Promise.resolve({});

      if (!user) {
        response.status(404).send({ success: false, error: "User not found." });
        return;
      }

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

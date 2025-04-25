import { EditUserRequestBodySchema } from "@ordo/libs/validators/user.schemas";
import { IdParamSchema } from "@ordo/libs/validators/util.schemas";
import type { Request, Response } from "express";
import { ZodError } from "zod";

export const UsersController = {
  async getUser(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);

      console.debug(id);

      const user = await Promise.resolve({});

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
      }
    }
  },

  async updateUser(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);
      const userUpdatePayload = EditUserRequestBodySchema.parse(request.body);

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
      }
    }
  },
};

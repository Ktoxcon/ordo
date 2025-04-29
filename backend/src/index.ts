import "@ordo/config/firebase.config";
import "reflect-metadata";

import AppConfig from "@ordo/config/app.config";
import { app } from "@ordo/interfaces/http/app";
import { onRequest } from "firebase-functions/v2/https";

export const api = onRequest(
  { secrets: AppConfig.secrets, cors: [process.env.APP_DOMAIN] },
  app
);

import { onRequest } from "firebase-functions/v2/https";
import AppConfig from "./config/app.config";
import { app } from "./infrastructure/main";

export const api = onRequest({ secrets: AppConfig.secrets }, app);

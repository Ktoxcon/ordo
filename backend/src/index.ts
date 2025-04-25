import { onRequest } from "firebase-functions/v2/https";
import { app } from "./infrastructure/main";

export const api = onRequest(app);

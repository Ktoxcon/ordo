import { AuthRoutes } from "@ordo/interfaces/http/routes/auth.routes";
import { ProfileRoutes } from "@ordo/interfaces/http/routes/profile.routes";
import { TaskRoutes } from "@ordo/interfaces/http/routes/task.routes";
import cookieParser from "cookie-parser";
import express from "express";

export const app = express();

app.use(cookieParser());

app.use("/api/auth", AuthRoutes);
app.use("/api/tasks", TaskRoutes);
app.use("/api/profile", ProfileRoutes);

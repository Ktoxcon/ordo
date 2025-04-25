import { AuthRoutes } from "@ordo/routes/auth.routes";
import { ProfileRoutes } from "@ordo/routes/profile.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

export const app = express();

app.use(cors());
app.use(cookieParser());
app.use(morgan("combined"));

app.use("/api/profile", ProfileRoutes);
app.use("/api/auth", AuthRoutes);

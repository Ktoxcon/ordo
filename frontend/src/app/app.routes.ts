import type { Routes } from "@angular/router";
import { guestGuard } from "./core/auth/guards/guest.guard";
import { HomeComponent } from "./features/home/pages/landing/home.component";

export const routes: Routes = [
  {
    path: "",
    title: "Ordo",
    pathMatch: "full",
    canMatch: [guestGuard],
    component: HomeComponent,
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./features/auth/auth.routes").then(
        ({ AuthRoutes }) => AuthRoutes
      ),
  },
  {
    path: "tasks",

    loadChildren: () =>
      import("./features/tasks/tasks.routes").then(
        ({ TasksRoutes }) => TasksRoutes
      ),
  },
  { path: "**", redirectTo: "" },
];

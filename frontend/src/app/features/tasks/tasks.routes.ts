import type { Routes } from "@angular/router";
import { authGuard } from "../../core/auth/guards/auth.guard";
import { TasksLayoutComponent } from "./layout/tasks-layout/tasks-layout.component";
import { TasksDashboardComponent } from "./pages/tasks-dashboard/tasks-dashboard.component";

export const TasksRoutes: Routes = [
  {
    path: "",
    canMatch: [authGuard],
    component: TasksLayoutComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "dashboard",
      },
      {
        path: "dashboard",
        title: "Ordo | Tasks Dashboard",
        component: TasksDashboardComponent,
      },
      {
        path: "create",
        title: "Ordo | Create Task",
        loadComponent: () =>
          import("./pages/create-task/create-task.component").then(
            ({ CreateTaskComponent }) => CreateTaskComponent
          ),
      },
      {
        path: ":id/edit",
        title: "Ordo | Edit Task",
        loadComponent: () =>
          import("./pages/edit-task/edit-task.component").then(
            ({ EditTaskComponent }) => EditTaskComponent
          ),
      },
    ],
  },
];

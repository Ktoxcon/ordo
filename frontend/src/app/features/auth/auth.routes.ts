import type { Routes } from "@angular/router";
import { guestGuard } from "../../core/auth/guards/guest.guard";
import { AuthLayoutComponent } from "./layout/auth-layout.component";
import { SignInComponent } from "./pages/sign-in/sign-in.component";

export const AuthRoutes: Routes = [
  {
    path: "",
    canMatch: [guestGuard],
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "sign-in",
      },
      {
        path: "sign-in",
        title: "Ordo | Sign In",
        component: SignInComponent,
      },
      {
        path: "sign-up",
        title: "Ordo | Sign Up",
        loadComponent: () =>
          import("./pages/sign-up/sign-up.component").then(
            ({ SignUpComponent }) => SignUpComponent
          ),
      },
    ],
  },
];

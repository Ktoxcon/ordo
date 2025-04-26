import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MagicLinkFormComponent } from "./magic-link-form/magic-link-form.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "auth",

    children: [{ path: "magic-link", component: MagicLinkFormComponent }],
  },
];

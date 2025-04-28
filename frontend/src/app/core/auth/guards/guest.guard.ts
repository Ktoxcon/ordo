import { inject } from "@angular/core";
import { type CanMatchFn, Router } from "@angular/router";
import { map, take } from "rxjs";
import { AuthService } from "../services/auth.service";

export const guestGuard: CanMatchFn = () => {
  const router = inject(Router);
  const auth = inject(AuthService);

  return auth.isLoggedIn$.pipe(
    take(1),
    map((isLogged) => {
      return isLogged ? router.createUrlTree(["/tasks"]) : true;
    })
  );
};

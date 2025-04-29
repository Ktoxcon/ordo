import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import type { User, UserCredentials } from "../../../shared/types/user.types";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  private readonly userSubject = new BehaviorSubject<User | null>(
    this.readProfileCookie()
  );
  readonly isLoggedIn$ = this.userSubject.asObservable().pipe(map(Boolean));

  signIn(credentials: UserCredentials) {
    return this.http
      .post<{ success: true }>("/api/auth/sign-in", credentials)
      .pipe(switchMap(() => this.refreshUser()));
  }

  signUp(credentials: UserCredentials) {
    return this.http
      .post<{ success: true }>("/api/auth/sign-up", credentials)
      .pipe(switchMap(() => this.refreshUser()));
  }

  signOut() {
    return this.http
      .post("/api/auth/sign-out", {})
      .pipe(tap(() => this.userSubject.next(null)));
  }

  refreshUser() {
    const cookieUser = this.readProfileCookie();
    this.userSubject.next(cookieUser);
    return of(cookieUser);
  }

  private readProfileCookie() {
    const cookie = this.cookieService.get("profile");
    const profile = this.decodeProfileCookie(cookie);

    return profile;
  }

  private decodeProfileCookie(cookie: string) {
    try {
      const decodedProfileCookie: User = JSON.parse(
        decodeURIComponent(atob(cookie))
      );
      return decodedProfileCookie;
    } catch (error) {
      return null;
    }
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";

export interface AuthCredentials {
  email: string;
}

export interface User {
  id: string;
  email: string;
}

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

  signIn(credentials: AuthCredentials) {
    return this.http
      .post<{ success: true }>("/api/auth/sign-in", credentials, {
        withCredentials: true,
      })
      .pipe(switchMap(() => this.refreshUser()));
  }

  signUp(credentials: AuthCredentials) {
    return this.http
      .post<{ success: true }>("/api/auth/sign-up", credentials, {
        withCredentials: true,
      })
      .pipe(switchMap(() => this.refreshUser()));
  }

  signOut() {
    return this.http
      .post("/api/auth/sign-out", {}, { withCredentials: true })
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

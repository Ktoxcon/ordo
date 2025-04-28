import { AsyncPipe } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../../core/auth/services/auth.service";
import { SignOutButtonComponent } from "../../../features/auth/components/sign-out-button/sign-out-button.component";

@Component({
  selector: "app-nav",
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    MatButtonModule,
    MatToolbarModule,
    SignOutButtonComponent,
  ],
  templateUrl: "./app-nav.component.html",
  styleUrl: "./app-nav.component.scss",
})
export class AppNavComponent {
  readonly authService = inject(AuthService);
  readonly isLoggedIn$ = this.authService.isLoggedIn$;

  @Input() hideLinks? = false;
}

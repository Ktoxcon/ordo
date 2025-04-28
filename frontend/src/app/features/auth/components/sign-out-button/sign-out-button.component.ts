import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import { AuthService } from "../../../../core/auth/services/auth.service";

@Component({
  standalone: true,
  imports: [MatButtonModule],
  selector: "app-sign-out-button",
  styleUrl: "./sign-out-button.component.scss",
  templateUrl: "./sign-out-button.component.html",
})
export class SignOutButtonComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  signOut() {
    this.authService
      .signOut()
      .subscribe({ next: () => this.router.navigateByUrl("/") });
  }
}

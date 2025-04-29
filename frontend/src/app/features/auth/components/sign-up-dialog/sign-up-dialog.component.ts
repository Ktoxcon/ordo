import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { concatMap } from "rxjs";
import { AuthService } from "../../../../core/auth/services/auth.service";
import type { UserCredentials } from "../../../../shared/types/user.types";

@Component({
  selector: "app-sign-up-dialog",
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: "./sign-up-dialog.component.html",
  styleUrl: "./sign-up-dialog.component.scss",
})
export class SignUpDialogComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  credentials: UserCredentials = inject(MAT_DIALOG_DATA);

  createAccountAndSignIn() {
    this.authService
      .signUp(this.credentials)
      .pipe(concatMap(() => this.authService.signIn(this.credentials)))
      .subscribe({
        next: () => this.router.navigateByUrl("/tasks"),
      });
  }
}

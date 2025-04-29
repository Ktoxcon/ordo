import { CommonModule } from "@angular/common";
import type { HttpErrorResponse } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../../../core/auth/services/auth.service";
import type { UserCredentials } from "../../../../shared/types/user.types";
import { SignUpDialogComponent } from "../../components/sign-up-dialog/sign-up-dialog.component";

@Component({
  selector: "app-sign-in",
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressBarModule,
  ],
  templateUrl: "./sign-in.component.html",
  styleUrl: "../../styles/auth-form.styles.scss",
})
export class SignInComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly dialog = inject(MatDialog);

  error = false;
  loading = false;
  private formBuilder = inject(FormBuilder);

  readonly form = this.formBuilder.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
  });

  get email() {
    return this.form.controls.email;
  }

  get touched() {
    return this.form.touched || this.form.dirty;
  }

  private openDialog() {
    this.dialog
      .open(SignUpDialogComponent, {
        data: this.form.value,
      })
      .afterClosed()
      .subscribe(() => this.form.reset());
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = false;

    this.auth.signIn(this.form.value as UserCredentials).subscribe({
      next: () => this.router.navigateByUrl("/tasks"),
      error: ({ status }: HttpErrorResponse) => {
        this.loading = false;
        this.form.markAsPristine();

        if (status === 404) {
          this.openDialog();
        }
      },
    });
  }
}

import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../../../core/auth/services/auth.service";
import type { UserCredentials } from "../../../../shared/types/user.types";

@Component({
  selector: "app-sign-up",
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
  templateUrl: "./sign-up.component.html",
  styleUrl: "../../styles/auth-form.styles.scss",
})
export class SignUpComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);

  error = false;
  loading = false;

  readonly form = this.formBuilder.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
  });

  get email() {
    return this.form.controls.email;
  }

  get touched() {
    return this.form.touched || this.form.dirty;
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = false;

    this.auth.signUp(this.form.value as UserCredentials).subscribe({
      next: () => this.router.navigateByUrl("/auth/sign-in"),
      error: () => {
        this.error = true;
        this.loading = false;
        this.form.markAsPristine();
      },
    });
  }
}

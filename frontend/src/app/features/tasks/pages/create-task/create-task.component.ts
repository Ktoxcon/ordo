import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router, RouterLink } from "@angular/router";
import { TaskService } from "../../../../core/tasks/services/task.service";
import type { Task } from "../../../../shared/types/task.types";
import { TaskFormContainerComponent } from "../../components/task-form-container/task-form-container.component";

@Component({
  selector: "app-create-task",
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TaskFormContainerComponent,
  ],
  templateUrl: "./create-task.component.html",
  styleUrl: "./create-task.component.scss",
})
export class CreateTaskComponent {
  private readonly router = inject(Router);
  private readonly tasks = inject(TaskService);

  error = false;
  loading = false;
  private formBuilder = inject(FormBuilder);

  readonly form = this.formBuilder.nonNullable.group({
    title: ["", [Validators.required]],
    description: ["", [Validators.required]],
  });

  get title() {
    return this.form.controls.title;
  }

  get description() {
    return this.form.controls.description;
  }

  get touched() {
    return this.form.touched || this.form.dirty;
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = false;

    this.tasks.createTask(this.form.value as Omit<Task, "id">).subscribe({
      next: () => this.router.navigateByUrl("/tasks"),
      error: () => {
        this.error = true;
        this.loading = false;
        this.form.markAsPristine();
      },
    });
  }
}

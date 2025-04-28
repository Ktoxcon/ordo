import { Component, Input, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router, RouterLink } from "@angular/router";
import { TaskService } from "../../../../core/tasks/services/task.service";
import { TaskFormContainerComponent } from "../../components/task-form-container/task-form-container.component";

@Component({
  selector: "app-edit-task",
  standalone: true,
  imports: [
    RouterLink,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    TaskFormContainerComponent,
  ],
  templateUrl: "./edit-task.component.html",
  styleUrl: "./edit-task.component.scss",
})
export class EditTaskComponent {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly taskService = inject(TaskService);

  error = false;
  loading = false;
  private taskId!: string;

  readonly form = this.formBuilder.nonNullable.group({
    description: [""],
    title: ["", [Validators.required]],
  });

  @Input() set id(taskId: string) {
    this.taskId = taskId;
    this.taskService.getTask(taskId).subscribe(({ data }) => {
      this.form.patchValue({
        title: data.title,
        description: data.description,
      });
    });
  }

  get title() {
    return this.form.controls.title;
  }

  get description() {
    return this.form.controls.description;
  }

  get touched() {
    return this.form.touched || this.form.dirty;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.taskService.updateTask(this.taskId, this.form.value).subscribe(() => {
      this.router.navigateByUrl("/tasks");
    });
  }
}

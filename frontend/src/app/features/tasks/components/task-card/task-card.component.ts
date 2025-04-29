import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";
import {
  catchError,
  debounceTime,
  filter,
  of,
  switchMap,
  take,
  tap,
} from "rxjs";
import { TaskService } from "../../../../core/tasks/services/task.service";
import { DateFormatter } from "../../../../shared/formatters/date.formatter";
import { DeleteTaskDialogComponent } from "../delete-task-dialog/delete-task-dialog.component";

@Component({
  selector: "app-task-card",
  standalone: true,
  imports: [
    MatIcon,
    RouterLink,
    FormsModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./task-card.component.html",
  styleUrl: "./task-card.component.scss",
})
export class TaskCardComponent {
  private readonly dialog = inject(MatDialog);
  private readonly taskService = inject(TaskService);

  readonly completedCheckbox = new FormControl();

  @Input() id = "";
  @Input() title = "";
  @Input() completed = false;
  @Input() description = "";
  @Input() creationDate = "";

  @Output() refresh = new EventEmitter<void>();

  ngOnInit() {
    this.completedCheckbox.setValue(this.completed, { emitEvent: false });

    this.completedCheckbox.valueChanges
      .pipe(
        debounceTime(400),
        switchMap((checked) => this.updateTaskStatus(checked))
      )
      .subscribe();
  }

  get formattedCreationDate(): string {
    if (!this.creationDate) return "";

    const date = new Date(this.creationDate);

    return DateFormatter.format(date);
  }

  deleteTask() {
    this.dialog
      .open(DeleteTaskDialogComponent, {
        data: { id: this.id },
      })
      .afterClosed()
      .pipe(
        filter((confirmed) => confirmed === true),
        switchMap(() => this.taskService.deleteTask(this.id)),
        tap(() => this.refresh.emit()),
        take(1)
      )
      .subscribe();
  }

  updateTaskStatus(checked: boolean) {
    return this.taskService
      .updateTask(this.id, { completed: checked })
      .pipe(catchError((error) => of(null)));
  }
}

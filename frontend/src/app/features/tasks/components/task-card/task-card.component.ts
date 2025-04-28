import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { filter, switchMap, take, tap } from "rxjs";
import { TaskService } from "../../../../core/tasks/services/task.service";
import { DeleteTaskDialogComponent } from "../delete-task-dialog/delete-task-dialog.component";

@Component({
  selector: "app-task-card",
  standalone: true,
  imports: [
    MatIcon,
    RouterLink,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
  ],
  templateUrl: "./task-card.component.html",
  styleUrl: "./task-card.component.scss",
})
export class TaskCardComponent {
  private readonly dialog = inject(MatDialog);
  private readonly taskService = inject(TaskService);

  @Input() id = "";
  @Input() title = "";
  @Input() completed = false;
  @Input() description = "";
  @Input() creationDate = "";

  @Output() deleted = new EventEmitter<void>();

  get formattedCreationDate(): string {
    if (!this.creationDate) return "";

    const date = new Date(this.creationDate);

    return new Intl.DateTimeFormat("en-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  }

  openDialog() {
    this.dialog
      .open(DeleteTaskDialogComponent, {
        data: { id: this.id },
      })
      .afterClosed()
      .pipe(
        filter((confirmed) => confirmed === true),
        switchMap(() => this.taskService.deleteTask(this.id)),
        tap(() => this.deleted.emit()),
        take(1)
      )
      .subscribe({
        error: (err) => {
          console.log(err);
        },
      });
  }
}

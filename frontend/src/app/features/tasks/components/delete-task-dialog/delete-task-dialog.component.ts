import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-delete-task-dialog",
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: "./delete-task-dialog.component.html",
  styleUrl: "./delete-task-dialog.component.scss",
})
export class DeleteTaskDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<DeleteTaskDialogComponent>);

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }
}

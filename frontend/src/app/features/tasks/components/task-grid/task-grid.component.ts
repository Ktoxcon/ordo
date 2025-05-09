import { Component, inject } from "@angular/core";
import { TaskService } from "../../../../core/tasks/services/task.service";
import type { Task } from "../../../../shared/types/task.types";
import { TaskCardComponent } from "../task-card/task-card.component";

@Component({
  selector: "app-task-grid",
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: "./task-grid.component.html",
  styleUrl: "./task-grid.component.scss",
})
export class TaskGridComponent {
  tasks: Task[] = [];

  private readonly taskService = inject(TaskService);

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.listTasks().subscribe(({ data }) => {
      this.tasks = data;
    });
  }
}

import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { TaskGridComponent } from "../../components/task-grid/task-grid.component";

@Component({
  selector: "app-tasks-dashboard",
  standalone: true,
  imports: [TaskGridComponent, MatButtonModule, RouterLink],
  templateUrl: "./tasks-dashboard.component.html",
  styleUrl: "./tasks-dashboard.component.scss",
})
export class TasksDashboardComponent {}

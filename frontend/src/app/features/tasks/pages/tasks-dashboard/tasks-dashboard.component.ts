import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { map } from "rxjs";
import { TaskGridComponent } from "../../components/task-grid/task-grid.component";

@Component({
  selector: "app-tasks-dashboard",
  standalone: true,
  imports: [TaskGridComponent, MatButtonModule, RouterLink, CommonModule],
  templateUrl: "./tasks-dashboard.component.html",
  styleUrl: "./tasks-dashboard.component.scss",
})
export class TasksDashboardComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly isHandset$ = this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.Handset])
    .pipe(map((result) => result.matches));
}

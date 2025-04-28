import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AppNavComponent } from "../../../../shared/components/app-nav/app-nav.component";
import { LayoutComponent } from "../../../../shared/layout/layout.component";

@Component({
  selector: "app-tasks-layout",
  standalone: true,
  imports: [LayoutComponent, AppNavComponent, RouterOutlet],
  templateUrl: "./tasks-layout.component.html",
  styleUrl: "./tasks-layout.component.scss",
})
export class TasksLayoutComponent {}

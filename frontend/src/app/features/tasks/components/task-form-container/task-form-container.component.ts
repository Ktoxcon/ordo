import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { map } from "rxjs";

@Component({
  selector: "app-task-form-container",
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: "./task-form-container.component.html",
  styleUrl: "./task-form-container.component.scss",
})
export class TaskFormContainerComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly isHandset$ = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));
}

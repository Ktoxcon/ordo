import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { RouterOutlet } from "@angular/router";
import { map } from "rxjs";
import { AppNavComponent } from "../../../shared/components/app-nav/app-nav.component";
import { LayoutComponent } from "../../../shared/layout/layout.component";

@Component({
  selector: "app-auth-layout",
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatCardModule,
    LayoutComponent,
    AppNavComponent,
  ],
  templateUrl: "./auth-layout.component.html",
  styleUrl: "./auth-layout.component.scss",
})
export class AuthLayoutComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly isHandset$ = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));
}

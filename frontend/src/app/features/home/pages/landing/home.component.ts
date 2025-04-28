import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { AppNavComponent } from "../../../../shared/components/app-nav/app-nav.component";
import { LayoutComponent } from "../../../../shared/layout/layout.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterLink, MatButtonModule, LayoutComponent, AppNavComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  featureList = [
    {
      title: "Organize Missions",
      description: "Bring order to your operations.",
    },
    {
      title: "Destroy Disorder",
      description: "Crush distractions with ruthless efficiency.",
    },
    {
      title: "Serve the Imperium",
      description: "Your tasks fuel the Machine Spirit.",
    },
  ];
}

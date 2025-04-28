import { Component } from "@angular/core";
import { FooterComponent } from "../components/footer/footer.component";

@Component({
  selector: "layout",
  standalone: true,
  imports: [FooterComponent],
  templateUrl: "./layout.component.html",
  styleUrl: "./layout.component.scss",
})
export class LayoutComponent {}

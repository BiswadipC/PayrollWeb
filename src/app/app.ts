import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewDesignations } from "./Components/Designations/view-designations/view-designations";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'PayrollWeb';
}

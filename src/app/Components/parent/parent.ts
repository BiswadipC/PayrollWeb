import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-parent',
  imports: [Navbar, RouterOutlet],
  templateUrl: './parent.html',
  styleUrl: './parent.css',
})
export class Parent {

}

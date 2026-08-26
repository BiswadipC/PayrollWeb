import { Component, OnInit } from '@angular/core';
import { DesignationServices } from '../../../Services/designation-services';
import { IDesignation } from '../../../ClassesAndInterfaces/IDesignation';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-view-designations',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './view-designations.html',
  styleUrl: './view-designations.css',
})
export class ViewDesignations implements OnInit {
  designations: IDesignation[] = [];
  constructor(private ds: DesignationServices){}

  ngOnInit(): void {
    this.ds.getDesignations().subscribe({
      next: result => {
        this.designations = result;
        console.log(this.designations);
      }
    });
  } // ngOnInit...
} // class...

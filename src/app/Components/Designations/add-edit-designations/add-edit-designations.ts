import { Component, OnInit } from '@angular/core';
import { DesignationServices } from '../../../Services/designation-services';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IDesignation } from '../../../ClassesAndInterfaces/IDesignation';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit-designations',
  imports: [FormsModule],
  templateUrl: './add-edit-designations.html',
  styleUrl: './add-edit-designations.css',
})
export class AddEditDesignations implements OnInit {
  constructor(private ds: DesignationServices, private act: ActivatedRoute, private router: Router){}
  designation: IDesignation = {} as IDesignation;
  IdNo: number = 0;
  Name: string = '';

  ngOnInit(): void {
    const id: number = Number(this.act.snapshot.params['id']);
    if(id > 0)
    {
      this.ds.getDesignationById(id).subscribe({
        next: res => {
          this.IdNo = res.IdNo;
          this.Name = res.Name;
        }
      });
    }
    else
    {
      this.IdNo = 0;
      this.Name = '';
    } // end if...
  } // ngOnInit...

  Save()
  {
    this.designation.IdNo = this.IdNo;
    this.designation.Name = this.Name;

    this.ds.saveDesignation(this.designation).subscribe({
      next: res => {
        if(res.Message == "Success")
        {
          this.router.navigate(['designations']);
        }
      }
    });
  } // Save...
} // class...

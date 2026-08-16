import { Component, OnInit } from '@angular/core';
import { DesignationServices } from '../../../Services/designation-services';
import { ActivatedRoute } from '@angular/router';
import { IDesignation } from '../../../ClassesAndInterfaces/IDesignation';

@Component({
  selector: 'app-add-edit-designations',
  imports: [],
  templateUrl: './add-edit-designations.html',
  styleUrl: './add-edit-designations.css',
})
export class AddEditDesignations implements OnInit {
  constructor(private ds: DesignationServices, private act: ActivatedRoute){}
  designation: IDesignation = {} as IDesignation;

  ngOnInit(): void {
    const id: number = Number(this.act.snapshot.params['id']);
    if(id > 0)
    {

    }
    else
    {
      this.designation.IdNo = 0;
      this.designation.Name = '';
    } // end if...
  } // ngOnInit...
} // class...

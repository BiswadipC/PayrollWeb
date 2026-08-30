import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SalarycomponentsService } from '../../../Services/salarycomponents-service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit-salary-components',
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-salary-components.html',
  styleUrl: './add-edit-salary-components.css',
})
export class AddEditSalaryComponents {
  formGroup: FormGroup;

  constructor(private router: Router, private cs: SalarycomponentsService, private fb: FormBuilder)
  {
    this.formGroup = fb.group({
      'ComponentId': [0],
      'CompanyId': [0],
      'ComponentCode': [''],
      'ComponentName': [''],
      'ComponentType': [''],
      'CalculationType': [''],
      'Taxable': ['']
    }); // formGroup...
  } // constructor...

  Back()
  {
    this.router.navigate(['Salary-Components']);
  } // Back...
} // class...

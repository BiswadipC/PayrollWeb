import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalarycomponentsService } from '../../../Services/salarycomponents-service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ISalaryComponent } from '../../../ClassesAndInterfaces/ISalaryComponent';

@Component({
  selector: 'app-add-edit-salary-components',
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-salary-components.html',
  styleUrl: './add-edit-salary-components.css',
})
export class AddEditSalaryComponents implements OnInit {
  formGroup: FormGroup;
  errors: string[] = [];
  salaryComponent: ISalaryComponent = {} as ISalaryComponent;

  constructor(private router: Router, private cs: SalarycomponentsService, private fb: FormBuilder, private act: ActivatedRoute)
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

  ngOnInit(): void {
    const id = Number(this.act.snapshot.params['id']);
    if(id == 0)
    {
      this.formGroup.get('ComponentId')?.patchValue(id);
    }
    else
    {
      this.cs.GetSalaryComponentByComponentId(id).subscribe({
        next: res => {
          this.formGroup.patchValue({
          'ComponentId': res.ComponentId,
          'CompanyId': res.CompanyId,
          'ComponentCode': res.ComponentCode,
          'ComponentName': res.ComponentName,
          'ComponentType': res.ComponentType,
          'CalculationType': res.CalculationType,
          'Taxable': res.Taxable
          });
        }
      });
    } // end if...
  } // ngOnInit...

  Back()
  {
    this.router.navigate(['Salary-Components']);
  } // Back...

  Save()
  {
    this.errors = [];

    if(this.formGroup.get('ComponentCode')?.value == '')
    {
      this.errors.push('Component Code cannot be blank.');
    }
    if(this.formGroup.get('ComponentName')?.value == '')
    {
      this.errors.push('Component Name cannot be blank.');
    }
    if(this.formGroup.get('ComponentType')?.value == '')
    {
      this.errors.push('Component Type cannot be blank.');
    }
    if(this.formGroup.get('CalculationType')?.value == '')
    {
      this.errors.push('Calculation Type cannot be blank.');
    }
    if(this.formGroup.get('Taxable')?.value == '')
    {
      this.errors.push('Please select whether component is taxable or not? (Yes/No).');
    }

    if(this.errors.length > 0)
    {
      return;
    }

    this.salaryComponent.ComponentId = this.formGroup.get('ComponentId')?.value;
    this.salaryComponent.CompanyId = Number(sessionStorage.getItem('CompanyId'));
    this.salaryComponent.ComponentCode = this.formGroup.get('ComponentCode')?.value;
    this.salaryComponent.ComponentName = this.formGroup.get('ComponentName')?.value;
    this.salaryComponent.ComponentType = this.formGroup.get('ComponentType')?.value;
    this.salaryComponent.CalculationType = this.formGroup.get('CalculationType')?.value;
    this.salaryComponent.Taxable = this.formGroup.get('Taxable')?.value;

    this.cs.Save(this.salaryComponent).subscribe({
      next: res => {
        if(res.Message == "Success")
        {
          this.router.navigateByUrl('Salary-Components');
        }
      },
      error: err => {
        const errorList = err.error.errors;
        for(let m in errorList)
        {
          const messages = errorList[m];
          this.errors = [];
          messages.forEach((x: any) => {
            this.errors.push(x);
          })
        }
      }
    });
  } // Save...
} // class...

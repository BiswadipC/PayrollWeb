import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ISalaryComponent } from '../../../ClassesAndInterfaces/ISalaryComponent';
import { SalarycomponentsService } from '../../../Services/salarycomponents-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-salary-components',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-salary-components.html',
  styleUrl: './view-salary-components.css',
})
export class ViewSalaryComponents implements OnInit {
  components: ISalaryComponent[] = [];
  constructor(private cs: SalarycomponentsService, private cdr: ChangeDetectorRef, private router: Router){}

  ngOnInit(): void {
    this.cs.GetSalaryComponents().subscribe({
      next: res => {
        this.components = res;
        this.cdr.detectChanges();
      }
    });
  } // ngOnInit...

  searchText: string = '';

  editComponent(componentId: number)
  {
    this.router.navigate(['Salary-Components', componentId]);
  } // editComponent...

  AddNewcomponent()
  {
    this.router.navigate(['Salary-Components', 0]);
  } // AddNewcomponent...
} // class...

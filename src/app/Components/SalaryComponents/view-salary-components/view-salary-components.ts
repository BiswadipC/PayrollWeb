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
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private cs: SalarycomponentsService, private cdr: ChangeDetectorRef, private router: Router){}

  ngOnInit(): void {
    this.cs.GetSalaryComponents().subscribe({
      next: res => {
        this.components = res;
        this.cdr.detectChanges();
      }
    });
  } // ngOnInit...

  get filteredComponents(): any[]
  {
    if (!this.searchText)
    {
      return this.components;
    }

    const search = this.searchText.toLowerCase();

    return this.components.filter(component =>
      component.ComponentCode?.toLowerCase().includes(search) ||
      component.ComponentName?.toLowerCase().includes(search) ||
      component.ComponentType?.toLowerCase().includes(search) ||
      component.CalculationType?.toLowerCase().includes(search) ||
      component.Taxable?.toLowerCase().includes(search)
    );
  } // filteredComponents...

  get totalPages(): number
  {
    return Math.ceil(this.filteredComponents.length / this.pageSize);
  } // totalPages...

  get paginatedComponents(): any[]
  {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredComponents.slice(startIndex, endIndex);
  } // paginatedComponents...

  changePage(page: number): void
  {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
  } // changePage...

  previousPage(): void
  {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  } // previousPage...

  nextPage(): void
  {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  } // nextPage...

  changePageSize(): void
  {
    this.currentPage = 1;
  } // changePageSize...

  editComponent(componentId: number)
  {
    this.router.navigate(['Salary-Components', componentId]);
  } // editComponent...

  AddNewcomponent()
  {
    this.router.navigate(['Salary-Components', 0]);
  } // AddNewcomponent...
} // class...

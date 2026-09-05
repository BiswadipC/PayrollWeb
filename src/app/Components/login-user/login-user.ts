import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IAuthenticateUser } from '../../ClassesAndInterfaces/IAuthenticateUser';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../Services/company-service';
import { ICompany } from '../../ClassesAndInterfaces/ICompany';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth-service';

@Component({
  selector: 'app-login-user',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-user.html',
  styleUrl: './login-user.css',
})
export class LoginUser implements OnInit {
  constructor(private us: AuthService, private cdr: ChangeDetectorRef, private router: Router){}

  username: string ='';
  password: string = '';
  companyId: string = '';
  finYearId: string = '';
  user: IAuthenticateUser = {} as IAuthenticateUser;
  errors: string[] = [];
  isAuthenticated: boolean = false;
  companies: ICompany[] = [];
  cs = inject(CompanyService);
  years: {"YearId": number, "FromDate": string, "ToDate": string}[] = [];

  ngOnInit(): void {
    this.cs.GetCompanies().subscribe({
      next: res => {
        this.companies = res;
        this.cdr.detectChanges();
      }
    });

    this.cs.GetYears().subscribe({
      next: res => {
        this.years = res;
        this.cdr.detectChanges();
      }
    });
  } // ngOnInit...

  Authenticate()
  {
    this.errors = [];
    if(this.username.trim() == '')
    {
      this.errors.push("Username cannot be blank.");
    }
    if(this.password.trim() == '')
    {
      this.errors.push("Password cannot be blank.");
    }

    if(this.errors.length > 0)
    {
      return;
    }

    this.user.UserName = this.username;
    this.user.Password = this.password;

    this.us.AuthenticateUser(this.user).subscribe({
      next: res => {
        if(res.Message === true)
        {
          this.isAuthenticated = true;
          this.errors = [];
        }
      },
      error: err => {
        this.isAuthenticated = false;
        const errorList = err.error.errors;
        for(let m in errorList)
        {
          this.errors = [];
          const messages = errorList[m];
          messages.forEach((x: any) => {
            this.errors.push(x);
          })
        }
      }
    });
  } // Authenticate...

  ContinueToDashboard()
  {
    this.errors = [];
    if(this.companyId == '')
    {
      this.errors.push("Please select a company to proceed.");
    }
    if(this.finYearId == '')
    {
      this.errors.push("Please select a financial year to proceed.");
    }

    if(this.errors.length > 0)
    {
      return;
    }

    const finYear = this.years.find(x => x.YearId == Number(this.finYearId));

    if(finYear != null)
    {
      const dateFrom = finYear?.FromDate;
      const dateTo = finYear?.ToDate;

      this.us.CreateJWTWithCompanyFinYearSelection(this.username, Number(this.companyId), dateFrom, dateTo).subscribe({
        next: res => {
          if(res.Message === "Success")
          {
            sessionStorage.setItem('UserName', this.username);
            sessionStorage.setItem('CompanyId', this.companyId);
            sessionStorage.setItem('DateFrom', dateFrom);
            sessionStorage.setItem('DateTo', dateTo);

            this.router.navigateByUrl('dashboard');
          }
        },
        error: err => {
          const errors = err.error.errors;
          for(let m in errors)
          {
            alert(errors[m]);
          }
        }
      });
    }

    return;
  } // ContinueToDashboard...
} // class...

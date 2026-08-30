import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICompany } from '../ClassesAndInterfaces/ICompany';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IFinYear } from '../ClassesAndInterfaces/IFinYear';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  http = inject(HttpClient);
  path: string = '';

  GetCompanies() : Observable<ICompany[]>
  {
    this.path = environment.API_PATH + 'company_and_finyear/companies';
    return this.http.get<ICompany[]>(this.path, {withCredentials: true});
  } // GetCompanies...

  GetYears() : Observable<IFinYear[]>
  {
    this.path = environment.API_PATH + 'company_and_finyear/years';
    return this.http.get<IFinYear[]>(this.path, {withCredentials: true});
  } // GetYears...
} // class...

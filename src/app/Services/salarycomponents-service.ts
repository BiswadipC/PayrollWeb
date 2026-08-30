import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISalaryComponent } from '../ClassesAndInterfaces/ISalaryComponent';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SalarycomponentsService {
  http = inject(HttpClient);
  path: string = '';

  GetSalaryComponents() : Observable<ISalaryComponent[]>
  {
    this.path = environment.API_PATH + `salarycomponents`;
    return this.http.get<ISalaryComponent[]>(this.path, {withCredentials: true});
  } // GetSalaryComponents...

  GetSalaryComponentByComponentId(componentId: number) : Observable<ISalaryComponent>
  {
    this.path = environment.API_PATH + `salarycomponents/${componentId}`;
    return this.http.get<ISalaryComponent>(this.path, {withCredentials: true});
  } // GetSalaryComponentByComponentId...

  Save(component: ISalaryComponent) : Observable<any>
  {
    this.path = environment.API_PATH + `salarycomponents`;
    return this.http.post<any>(this.path, component, {withCredentials: true});
  } // Save...
} // class...

import { inject, Injectable } from '@angular/core';
import { IDesignation } from '../ClassesAndInterfaces/IDesignation';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DesignationServices {
  path: string = '';
  http = inject(HttpClient);

  getDesignations() : Observable<IDesignation[]>
  {
    this.path = environment.API_PATH + 'designations';
    return this.http.get<IDesignation[]>(this.path, {withCredentials: true});
  } // getDesignations...

  getDesignationById(id: number) : Observable<IDesignation>
  {
    this.path = environment.API_PATH + `designations/${id}`;
    return this.http.get<IDesignation>(this.path, {withCredentials: true});
  } // getDesignationById...

  saveDesignation(designation: IDesignation) : Observable<any>
  {
    this.path = environment.API_PATH + 'designations';
    return this.http.post<any>(this.path, designation, {withCredentials: true});
  } // saveDesignation...
} // class...

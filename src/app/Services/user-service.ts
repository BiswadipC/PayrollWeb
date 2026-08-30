import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuthenticateUser } from '../ClassesAndInterfaces/IAuthenticateUser';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(){}

  path: string = '';
  http = inject(HttpClient);

  AuthenticateUser(user: IAuthenticateUser) : Observable<any>
  {
    this.path = environment.API_PATH + `user/authenticate`;
    return this.http.post<any>(this.path, user, {withCredentials: true});
  } // AuthenticateUser...

  CreateJWTWithCompanyFinYearSelection(username: string, companyId: number, dateFrom: string, dateTo: string) : Observable<any>
  {
    this.path = environment.API_PATH + 'user/CreateJWTWithCompanyFinYearSelection';
    const params = new HttpParams().set('username', username)
                    .set('companyId', companyId)
                    .set('dateFrom', dateFrom)
                    .set('dateTo', dateTo);

    return this.http.post<any>(this.path, '', {withCredentials: true, params: params});
  } // CreateJWTWithCompanyFinYearSelection...

  LogOut() : Observable<void>
  {
    this.path = environment.API_PATH + 'user/logout';
    return this.http.post<void>(this.path, '', {withCredentials: true});
  } // LogOut...
} // class...

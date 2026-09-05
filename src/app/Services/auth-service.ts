import { inject, Injectable } from '@angular/core';
import { IUserProfile } from '../ClassesAndInterfaces/IUserProfile';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, switchMap } from 'rxjs';
import { IAuthenticateUser } from '../ClassesAndInterfaces/IAuthenticateUser';
import { IUserClaims } from '../ClassesAndInterfaces/IUserClaims';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  path: string = '';

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
      sessionStorage.clear();
      this.path = environment.API_PATH + 'user/logout';
      return this.http.post<void>(this.path, '', {withCredentials: true});
    } // LogOut...

  GetUserProfile() : Observable<IUserProfile>
  {
    this.path = environment.API_PATH + 'user/UserProfile';
    return this.http.get<IUserProfile>(this.path, {withCredentials: true});
  } // GetUserProfile...

  RefreshTokens() : Observable<void>
  {
    this.path = environment.API_PATH + 'user/Refresh';

    const username = sessionStorage.getItem('UserName') ?? '';
    const companyId = Number(sessionStorage.getItem('CompanyId'));
    const dateFrom = sessionStorage.getItem('DateFrom') ?? '';
    const dateTo = sessionStorage.getItem('DateTo') ?? '';

    const params = new HttpParams()
        .set('username', username)
        .set('companyId', companyId)
        .set('dateFrom', dateFrom)
        .set('dateTo', dateTo);

    return this.http.post<void>(this.path, '', {withCredentials: true, params: params});
  } // RefreshTokens...

  IsLoggedIn() : Observable<boolean>
  {
    this.path = environment.API_PATH + 'user/IsLoggdIn';
    return this.http.get<boolean>(this.path, {withCredentials: true});
  } // IsLoggedIn...

  GetUserClaims() : Observable<IUserClaims[]>
  {
    const username = sessionStorage.getItem('UserName');
    this.path = environment.API_PATH + `user/GetUserClaims/${username}`;
    return this.http.get<IUserClaims[]>(this.path, {withCredentials: true});
  } // GetUserClaims...
} // class...

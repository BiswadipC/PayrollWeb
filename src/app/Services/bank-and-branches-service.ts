import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IBank, IBranch } from '../ClassesAndInterfaces/IBankAndBranches';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BankAndBranchesService {
  http = inject(HttpClient);
  path: string = '';

  GetBanks() : Observable<IBank[]>
  {
    this.path = environment.API_PATH + `bankandbranches`;
    return this.http.get<IBank[]>(this.path, {withCredentials: true});
  } // GetBanks...

  GetBranchesByBankId(bankId: number) : Observable<IBranch[]>
  {
    this.path = environment.API_PATH + `branches/${bankId}`;
    return this.http.get<IBranch[]>(this.path, {withCredentials: true});
  } // GetBranchesByBankId...

  GetBankByBankId(bankId: number) : Observable<IBank>
  {
    this.path = environment.API_PATH + `bankandbranches/${bankId}`;
    return this.http.get<IBank>(this.path, {withCredentials: true});
  } // GetBankByBankId...

  SaveBank(bank: IBank) : Observable<any>
  {
    this.path = environment.API_PATH + `bankandbranches`;
    return this.http.post<any>(this.path, bank, {withCredentials: true});
  } // SaveBank...
} // class...

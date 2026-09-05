import { Routes } from '@angular/router';
import { ViewDesignations } from './Components/Designations/view-designations/view-designations';
import { Parent } from './Components/parent/parent';
import { AddEditDesignations } from './Components/Designations/add-edit-designations/add-edit-designations';
import { ViewBankAndBranches } from './Components/BankAndBranches/view-bank-and-branches/view-bank-and-branches';
import { AddEditBankBranches } from './Components/BankAndBranches/add-edit-bank-branches/add-edit-bank-branches';
import { ViewSalaryComponents } from './Components/SalaryComponents/view-salary-components/view-salary-components';
import { AddEditSalaryComponents } from './Components/SalaryComponents/add-edit-salary-components/add-edit-salary-components';
import { LoginUser } from './Components/login-user/login-user';
import { Dashboard } from './Components/dashboard/dashboard';
import { authGuard } from './Common/auth-guard';
import { NotFound } from './Components/not-found/not-found';
import { UnAuthorized } from './Components/un-authorized/un-authorized';

export const routes: Routes = [
  {path: '', component: LoginUser},
  {path: 'login', component: LoginUser},
  {
    path: '', component: Parent, children: [
      {path: 'dashboard', component: Dashboard},
      {path: 'designations', component: ViewDesignations, canActivate: [authGuard],
        data: {"PolicyData": {type: 'DESIGNATION-View', value: 'View'}}
      },
      {path: 'add-edit-designations/:id', component: AddEditDesignations, canActivate: [authGuard],
        data: {"PolicyData": {type: 'DESIGNATION-Edit', value: 'Edit'}}
      },
      {path: 'banks', component: ViewBankAndBranches, canActivate: [authGuard],
        data: {"PolicyData": {type: 'BANK-View', value: 'View'}}
      },
      {path: 'banks/:id', component: AddEditBankBranches, canActivate: [authGuard],
        data: {"PolicyData": {type: "BANK-Edit", value: 'Edit'}}
      },
      {path: 'Salary-Components', component: ViewSalaryComponents, canActivate: [authGuard],
        data: {"PolicyData": {type: 'SALARY COMPONENT-View', value: 'View'}}
      },
      {path: 'Salary-Components/:id', component: AddEditSalaryComponents, canActivate: [authGuard],
        data: {"PolicyData": {type: "SALARY COMPONENT-Edit", value: 'Edit'}}
      },
      {path: 'UnAuthorized', component: UnAuthorized, canActivate: [authGuard]}
    ],
  },
  {path: '**', component: NotFound}
];

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

export const routes: Routes = [
  {path: '', component: LoginUser},
  {path: 'login', component: LoginUser},
  {
    path: '', component: Parent, children: [
      {path: 'dashboard', component: Dashboard},
      {path: 'designations', component: ViewDesignations},
      {path: 'add-edit-designations/:id', component: AddEditDesignations},
      {path: 'banks', component: ViewBankAndBranches},
      {path: 'banks/:id', component: AddEditBankBranches},
      {path: 'Salary-Components', component: ViewSalaryComponents},
      {path: 'Salary-Components/:id', component: AddEditSalaryComponents}
    ],
  }
];

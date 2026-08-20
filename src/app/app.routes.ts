import { Routes } from '@angular/router';
import { ViewDesignations } from './Components/Designations/view-designations/view-designations';
import { Parent } from './Components/parent/parent';
import { AddEditDesignations } from './Components/Designations/add-edit-designations/add-edit-designations';
import { ViewBankAndBranches } from './Components/BankAndBranches/view-bank-and-branches/view-bank-and-branches';
import { AddEditBankBranches } from './Components/BankAndBranches/add-edit-bank-branches/add-edit-bank-branches';

export const routes: Routes = [
  {
    path: '', component: Parent, children: [
      {path: 'designations', component: ViewDesignations},
      {path: 'add-edit-designations/:id', component: AddEditDesignations},
      {path: 'banks', component: ViewBankAndBranches},
      {path: 'banks/:id', component: AddEditBankBranches}
    ]
  }
];

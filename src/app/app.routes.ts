import { Routes } from '@angular/router';
import { ViewDesignations } from './Components/Designations/view-designations/view-designations';
import { Parent } from './Components/parent/parent';
import { AddEditDesignations } from './Components/Designations/add-edit-designations/add-edit-designations';

export const routes: Routes = [
  {
    path: '', component: Parent, children: [
      {path: 'designations', component: ViewDesignations},
      {path: 'add-edit-designations/:id', component: AddEditDesignations}
    ]
  }
];

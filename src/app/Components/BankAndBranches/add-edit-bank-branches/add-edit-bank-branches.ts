import { Component } from '@angular/core';
import { BankAndBranchesService } from '../../../Services/bank-and-branches-service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IBank, IBranch } from '../../../ClassesAndInterfaces/IBankAndBranches';

@Component({
  selector: 'app-add-edit-bank-branches',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-bank-branches.html',
  styleUrl: './add-edit-bank-branches.css',
})
export class AddEditBankBranches {
  bankGroup: FormGroup;
  branchGroup: FormGroup;
  bank: IBank = {} as IBank;
  branches: IBranch[] = [];

  constructor(private bs: BankAndBranchesService, private router: Router, private fb: FormBuilder)
  {
    this.bankGroup = fb.group({
      'BankId': [0],
      'BankName': [''],
      'Branches': fb.array([])
    });

    this.branchGroup = fb.group({
      'RecId': [-1],
      'BranchId': [0],
      'BranchCode': [''],
      'BranchName': [''],
      'IFSCCode': [''],
      'Address': [''],
      'PhoneNo': ['']
    });
  } // constructor...

  ResetBranch()
  {

  } // ResetBranch...

  AddBranch()
  {

  } // AddBranch...

  Back()
  {
    this.router.navigateByUrl('banks');
  } // Back...

  Save()
  {

  } // Save...
} // class...

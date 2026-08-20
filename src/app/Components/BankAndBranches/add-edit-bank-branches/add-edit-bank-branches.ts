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

  get getDetails()
  {
    return this.bankGroup.get('Branches') as FormArray;
  } // getDetails...

  ResetBranch()
  {
    this.branchGroup.patchValue({
      'RecId': [-1],
      'BranchId': [0],
      'BranchCode': [''],
      'BranchName': [''],
      'IFSCCode': [''],
      'Address': [''],
      'PhoneNo': ['']
    });
  } // ResetBranch...

  AddBranch()
  {
    const recId = this.branchGroup.get('RecId')?.value;
    const initialGroup = this.fb.group({
      'RecId': [recId],
      'BranchId': [this.branchGroup.get('BranchId')?.value],
      'BranchCode': [this.branchGroup.get('BranchCode')?.value],
      'BranchName': [this.branchGroup.get('BranchName')?.value],
      'IFSCCode': [this.branchGroup.get('IFSCCode')?.value],
      'Address': [this.branchGroup.get('Address')?.value],
      'PhoneNo': [this.branchGroup.get('PhoneNo')?.value]
    });

    if(recId == -1)
    {
      (this.bankGroup.get('Branches') as FormArray).push(initialGroup);
    }
    else
    {
      (this.bankGroup.get('Branches') as FormArray).setControl(recId, initialGroup);
    } // end if...

    this.ResetBranch();
  } // AddBranch...

  Back()
  {
    this.router.navigateByUrl('banks');
  } // Back...

  Save()
  {
    this.bank.BankId = this.bankGroup.get('BankId')?.value;
    this.bank.BankName = this.bankGroup.get('BankName')?.value;

    this.branches = [];
    (this.bankGroup.get('Branches') as FormArray).controls.forEach(m => {
      const branch: IBranch = {} as IBranch;
      branch.BranchId = m.get('BranchId')?.value;
      branch.BranchCode = m.get('BranchCode')?.value;
      branch.BranchName = m.get('BranchName')?.value;
      branch.IFSCCode = m.get('IFSCCode')?.value;
      branch.Address = m.get('Address')?.value;
      branch.PhoneNo = m.get('PhoneNo')?.value;
      this.branches.push(branch);
    });

    this.bank.Branches = this.branches;

    this.bs.SaveBank(this.bank).subscribe({
      next: res => {
        if(res.Message == "Success")
        {
          this.router.navigateByUrl('banks');
        }
      }
    });
  } // Save...
} // class...

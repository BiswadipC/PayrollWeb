import { Component, OnInit } from '@angular/core';
import { BankAndBranchesService } from '../../../Services/bank-and-branches-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IBank, IBranch } from '../../../ClassesAndInterfaces/IBankAndBranches';
import { IApiErrorResponse } from '../../../ClassesAndInterfaces/IApiErrorResponse';

@Component({
  selector: 'app-add-edit-bank-branches',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-bank-branches.html',
  styleUrl: './add-edit-bank-branches.css',
})
export class AddEditBankBranches implements OnInit {
  bankGroup: FormGroup;
  branchGroup: FormGroup;
  bank: IBank = {} as IBank;
  branches: IBranch[] = [];
  errorList: IApiErrorResponse = {} as IApiErrorResponse;
  messages: string[] = [];

  constructor(private bs: BankAndBranchesService, private router: Router, private fb: FormBuilder, private act: ActivatedRoute)
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

  ngOnInit(): void {
    const bankId = Number(this.act.snapshot.params['id']);
    if(bankId == 0)
    {
      this.bankGroup.get('BankId')?.patchValue(0);
    }
    else
    {
      this.bs.GetBankByBankId(bankId).subscribe({
        next: res => {
          this.bank = res;
          this.bankGroup.get('BankId')?.patchValue(this.bank.BankId);
          this.bankGroup.get('BankName')?.patchValue(this.bank.BankName);

          this.bank.Branches.forEach(x => {
            const initialGroup = this.fb.group({
              'BranchId': [x.BranchId],
              'BranchCode': [x.BranchCode],
              'BranchName': [x.BranchName],
              'IFSCCode': [x.IFSCCode],
              'Address': [x.Address],
              'PhoneNo': [x.PhoneNo]
            });
            (this.bankGroup.get('Branches') as FormArray).push(initialGroup);
          });
        }
      });
    } // end if...
  } // ngOnInit...

  get getDetails()
  {
    return this.bankGroup.get('Branches') as FormArray;
  } // getDetails...

  ResetBranch()
  {
    this.branchGroup.patchValue({
      'RecId': -1,
      'BranchId': 0,
      'BranchCode': '',
      'BranchName': '',
      'IFSCCode': '',
      'Address': '',
      'PhoneNo': ''
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
      console.log(this.getDetails.controls);
    }
    else
    {
      (this.bankGroup.get('Branches') as FormArray).setControl(recId, initialGroup);
    } // end if...

    this.ResetBranch();
  } // AddBranch...

  Edit(n: number, branch: AbstractControl)
  {
    let d = branch as FormGroup;
    this.branchGroup.patchValue({
      RecId: n,
      BranchId: d.get('BranchId')?.value,
      BranchCode: d.get('BranchCode')?.value,
      BranchName: d.get('BranchName')?.value,
      IFSCCode: d.get('IFSCCode')?.value,
      Address: d.get('Address')?.value,
      PhoneNo: d.get('PhoneNo')?.value
    });
  } // Edit...

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
      },
      error: err =>
      {
        this.messages = [];
        if(err.error?.errors)
        {
          for(let m in err.error.errors)
          {
            const values = err.error.errors[m];
            values.forEach((x: string) => {
              this.messages.push(x);
            })
          }
        }
        else if(err.error?.detail)
        {
          this.messages.push(err.error.detail);
        }
        else if(err.error?.title)
        {
          this.messages.push(err.error.title);
        }
        else
        {
          this.messages.push("An unhandled error occured.");
        } // end if...
        //else if(err.error.de)

      }

    });
  } // Save...
} // class...

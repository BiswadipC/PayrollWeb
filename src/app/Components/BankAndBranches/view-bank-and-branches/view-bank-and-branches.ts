import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BankAndBranchesService } from '../../../Services/bank-and-branches-service';
import { IBank, IBranch } from '../../../ClassesAndInterfaces/IBankAndBranches';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-view-bank-and-branches',
  imports: [RouterLink],
  templateUrl: './view-bank-and-branches.html',
  styleUrl: './view-bank-and-branches.css',
})
export class ViewBankAndBranches implements OnInit {
  bank: IBank = {} as IBank;
  banks: IBank[] = [];
  branches: IBranch[] = [];

  constructor(private bs: BankAndBranchesService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.bs.GetBanks().subscribe({
      next: res => {
        this.banks = res;
        this.cdr.detectChanges();
      }
    });
  } // ngOnInit...
} // class...

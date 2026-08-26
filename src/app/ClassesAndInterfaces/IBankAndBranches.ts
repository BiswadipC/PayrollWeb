export interface IBank
{
  BankId: number;
  BankName: string;
  Branches: IBranch[];
}

export interface IBranch
{
  BranchId: number;
  BranchCode: string;
  BranchName: string;
  IFSCCode: string;
  Address: string;
  PhoneNo: string;
}

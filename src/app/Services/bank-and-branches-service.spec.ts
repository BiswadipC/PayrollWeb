import { TestBed } from '@angular/core/testing';

import { BankAndBranchesService } from './bank-and-branches-service';

describe('BankAndBranchesService', () => {
  let service: BankAndBranchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankAndBranchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

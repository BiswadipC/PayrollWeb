import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBankBranches } from './add-edit-bank-branches';

describe('AddEditBankBranches', () => {
  let component: AddEditBankBranches;
  let fixture: ComponentFixture<AddEditBankBranches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditBankBranches]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBankBranches);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

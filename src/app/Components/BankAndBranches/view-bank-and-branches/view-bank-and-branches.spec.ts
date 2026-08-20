import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBankAndBranches } from './view-bank-and-branches';

describe('ViewBankAndBranches', () => {
  let component: ViewBankAndBranches;
  let fixture: ComponentFixture<ViewBankAndBranches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBankAndBranches]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBankAndBranches);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

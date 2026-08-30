import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSalaryComponents } from './add-edit-salary-components';

describe('AddEditSalaryComponents', () => {
  let component: AddEditSalaryComponents;
  let fixture: ComponentFixture<AddEditSalaryComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditSalaryComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditSalaryComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

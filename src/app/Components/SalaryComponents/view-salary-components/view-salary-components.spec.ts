import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalaryComponents } from './view-salary-components';

describe('ViewSalaryComponents', () => {
  let component: ViewSalaryComponents;
  let fixture: ComponentFixture<ViewSalaryComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSalaryComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSalaryComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

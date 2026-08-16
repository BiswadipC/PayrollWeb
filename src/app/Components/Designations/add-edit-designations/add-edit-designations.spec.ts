import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDesignations } from './add-edit-designations';

describe('AddEditDesignations', () => {
  let component: AddEditDesignations;
  let fixture: ComponentFixture<AddEditDesignations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDesignations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDesignations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DesignationServices } from './designation-services';

describe('DesignationServices', () => {
  let service: DesignationServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignationServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

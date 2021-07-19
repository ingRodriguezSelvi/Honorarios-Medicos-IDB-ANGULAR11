import { TestBed } from '@angular/core/testing';

import { SumTotalService } from './sum-total.service';

describe('SumTotalService', () => {
  let service: SumTotalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SumTotalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

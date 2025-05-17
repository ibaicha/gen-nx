import { TestBed } from '@angular/core/testing';

import { CreditAgenceService } from './credit-agence.service';

describe('CreditAgenceService', () => {
  let service: CreditAgenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditAgenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

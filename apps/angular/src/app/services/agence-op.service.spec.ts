import { TestBed } from '@angular/core/testing';

import { AgenceOpService } from './agence-op.service';

describe('AgenceOpService', () => {
  let service: AgenceOpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgenceOpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

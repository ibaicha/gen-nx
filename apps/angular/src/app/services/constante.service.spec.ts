import { TestBed } from '@angular/core/testing';

import { ConstanteService } from './constante.service';

describe('ConstanteService', () => {
  let service: ConstanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing'
import { CreditAgenceService } from './credit-agence.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('CreditAgenceService', () => {
  let service: CreditAgenceService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreditAgenceService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(CreditAgenceService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

import { TestBed } from '@angular/core/testing'
import { CreditService } from './credit.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('CreditService', () => {
  let service: CreditService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreditService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(CreditService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

import { TestBed } from '@angular/core/testing'

import { RemboursementService } from './remboursement.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('RemboursementService', () => {
  let service: RemboursementService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RemboursementService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(RemboursementService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

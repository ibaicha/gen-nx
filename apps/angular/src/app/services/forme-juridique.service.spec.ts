import { TestBed } from '@angular/core/testing'

import { FormeJuridiqueService } from './forme-juridique.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('FormeJuridiqueService', () => {
  let service: FormeJuridiqueService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormeJuridiqueService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(FormeJuridiqueService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

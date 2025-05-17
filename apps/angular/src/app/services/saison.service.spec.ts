import { TestBed } from '@angular/core/testing'

import { SaisonService } from './saison.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('SaisonService', () => {
  let service: SaisonService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SaisonService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(SaisonService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

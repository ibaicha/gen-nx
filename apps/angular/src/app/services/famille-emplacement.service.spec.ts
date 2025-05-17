import { TestBed } from '@angular/core/testing'

import { FamilleEmplacementService } from './famille-emplacement.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('FamilleEmplacementService', () => {
  let service: FamilleEmplacementService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FamilleEmplacementService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(FamilleEmplacementService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

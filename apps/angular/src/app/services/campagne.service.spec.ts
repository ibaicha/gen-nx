import { TestBed } from '@angular/core/testing'
import { CampagneService } from './campagne.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('CampagneService', () => {
  let service: CampagneService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CampagneService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(CampagneService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

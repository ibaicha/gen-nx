import { TestBed } from '@angular/core/testing'

import { FiliereService } from './filiere.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('FiliereService', () => {
  let service: FiliereService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FiliereService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(FiliereService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

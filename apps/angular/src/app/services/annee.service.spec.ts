import { TestBed } from '@angular/core/testing'
import { AnneeService } from './annee.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('AnneeService', () => {
  let service: AnneeService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnneeService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(AnneeService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

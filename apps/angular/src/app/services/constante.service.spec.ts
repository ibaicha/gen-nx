import { TestBed } from '@angular/core/testing'
import { ConstanteService } from './constante.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('ConstanteService', () => {
  let service: ConstanteService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConstanteService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(ConstanteService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

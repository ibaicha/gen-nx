import { TestBed } from '@angular/core/testing'

import { VarieteService } from './variete.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('VarieteService', () => {
  let service: VarieteService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VarieteService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(VarieteService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

import { TestBed } from '@angular/core/testing'

import { SocieteService } from './societe.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('SocieteService', () => {
  let service: SocieteService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SocieteService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(SocieteService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

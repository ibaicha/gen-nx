import { TestBed } from '@angular/core/testing'

import { IdentifiantService } from './identifiant.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('IdentifiantService', () => {
  let service: IdentifiantService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IdentifiantService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(IdentifiantService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

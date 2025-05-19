import { TestBed } from '@angular/core/testing'

import { LocaliteService } from './localite.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('LocaliteService', () => {
  let service: LocaliteService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocaliteService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(LocaliteService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

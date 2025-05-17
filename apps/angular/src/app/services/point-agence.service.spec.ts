import { TestBed } from '@angular/core/testing'

import { PointAgenceService } from './point-agence.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('PointAgenceService', () => {
  let service: PointAgenceService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PointAgenceService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(PointAgenceService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

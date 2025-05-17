import { TestBed } from '@angular/core/testing'

import { PointService } from './point.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('PointService', () => {
  let service: PointService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PointService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(PointService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

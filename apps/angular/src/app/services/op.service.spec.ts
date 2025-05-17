import { TestBed } from '@angular/core/testing'

import { OpService } from './op.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('OpService', () => {
  let service: OpService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(OpService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

import { TestBed } from '@angular/core/testing'
import { AgenceOpService } from './agence-op.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('AgenceOpService', () => {
  let service: AgenceOpService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AgenceOpService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(AgenceOpService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

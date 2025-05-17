import { TestBed } from '@angular/core/testing'

import { MouvementIntrantService } from './mouvement-intrant.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('MouvementIntrantService', () => {
  let service: MouvementIntrantService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MouvementIntrantService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(MouvementIntrantService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

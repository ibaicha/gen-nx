import { TestBed } from '@angular/core/testing'
import { MouvementStockageService } from './mouvement-stockage.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('MouvementStockageService', () => {
  let service: MouvementStockageService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MouvementStockageService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(MouvementStockageService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

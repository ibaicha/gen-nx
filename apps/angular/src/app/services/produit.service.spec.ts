import { TestBed } from '@angular/core/testing'

import { ProduitService } from './produit.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('ProduitService', () => {
  let service: ProduitService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProduitService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(ProduitService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

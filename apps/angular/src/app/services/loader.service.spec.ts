import { TestBed } from '@angular/core/testing'

import { LoaderService } from './loader.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('LoaderService', () => {
  let service: LoaderService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoaderService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(LoaderService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

import { TestBed } from '@angular/core/testing'

import { NavigationService } from './navigation.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('NavigationService', () => {
  let service: NavigationService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NavigationService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(NavigationService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

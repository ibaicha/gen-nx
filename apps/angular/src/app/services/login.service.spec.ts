import { TestBed } from '@angular/core/testing'

import { LoginService } from './login.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('LoginService', () => {
  let service: LoginService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(LoginService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

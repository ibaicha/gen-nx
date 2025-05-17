import { TestBed } from '@angular/core/testing'

import { ShareService } from './share.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('ShareService', () => {
  let service: ShareService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShareService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(ShareService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

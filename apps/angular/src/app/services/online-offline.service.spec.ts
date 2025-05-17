import { TestBed } from '@angular/core/testing'

import { OnlineOfflineService } from './online-offline.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('OnlineOfflineService', () => {
  let service: OnlineOfflineService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OnlineOfflineService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(OnlineOfflineService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

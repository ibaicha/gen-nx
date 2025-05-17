import { TestBed } from '@angular/core/testing'

import { DbindexedService } from './dbindexed.service'

import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { AppService } from './app.service'

describe('DbindexedService', () => {
  let service: DbindexedService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DbindexedService,
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ], // ✅ ajoute AppService ici
    })
    service = TestBed.inject(DbindexedService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

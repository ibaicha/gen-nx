import { TestBed } from '@angular/core/testing'

import { CreditCampagneTitreComponent } from './credit-campagne-titre.component'

import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { AppService } from '../../../services/app.service'
import { ConfirmationService, MessageService } from 'primeng/api'
import { provideMockStore } from '@ngrx/store/testing'

describe('CreditCampagneTitreComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideMockStore({}),
        AppService,
        MessageService,
        ConfirmationService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(CreditCampagneTitreComponent)
    const component = fixture.componentInstance
    expect(component).toBeTruthy()
  })
})

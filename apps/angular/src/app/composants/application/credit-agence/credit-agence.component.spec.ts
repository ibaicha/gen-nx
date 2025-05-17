import { TestBed } from '@angular/core/testing'
import { CreditAgenceComponent } from './credit-agence.component'

import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { AppService } from '../../../services/app.service'
import { ConfirmationService, MessageService } from 'primeng/api'
import { provideMockStore } from '@ngrx/store/testing'
import { CreditAgenceService } from '../../../services/credit-agence.service'
import { DialogService } from 'primeng/dynamicdialog'

describe('CreditAgenceComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideMockStore({}),
        CreditAgenceService,
        AppService,
        MessageService,
        ConfirmationService,
        DialogService,
        provideMockStore({}),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(CreditAgenceComponent)
    const component = fixture.componentInstance
    expect(component).toBeTruthy()
  })
})

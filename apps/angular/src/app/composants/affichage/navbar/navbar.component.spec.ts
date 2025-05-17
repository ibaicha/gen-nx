import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NavbarComponent } from './navbar.component'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { AppService } from '../../../services/app.service'
import { ConfirmationService, MessageService } from 'primeng/api'
import { provideMockStore } from '@ngrx/store/testing'
import { ShareService } from '../../../services/share.service'

describe('NavbarComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideMockStore({}),
        AppService,
        MessageService,
        ConfirmationService,
        ShareService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(NavbarComponent)
    const component = fixture.componentInstance
    expect(component).toBeTruthy()
  })
})

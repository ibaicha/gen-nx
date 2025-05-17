import { TestBed } from '@angular/core/testing'
import { OpComponent } from './op.component'
import { provideMockStore } from '@ngrx/store/testing'
import { OpService } from '../../../services/op.service'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { AppService } from '../../../services/app.service'
import { ConfirmationService, MessageService } from 'primeng/api'

describe('OpComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideMockStore({}),
        OpService,
        AppService,
        MessageService,
        ConfirmationService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(OpComponent)
    const component = fixture.componentInstance
    expect(component).toBeTruthy()
  })
})

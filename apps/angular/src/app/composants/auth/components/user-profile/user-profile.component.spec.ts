import { TestBed } from '@angular/core/testing'
import { UserProfileComponent } from './user-profile.component'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { ConfirmationService, MessageService } from 'primeng/api'
import { provideMockStore } from '@ngrx/store/testing'
import { AppService } from '../../../../services/app.service'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'

describe('UserProfileComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserProfileComponent], // Include if standalone
      providers: [
        provideMockStore({}),
        AppService,
        MessageService,
        ConfirmationService,
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            // Mock the required properties/methods your component uses
            snapshot: {
              paramMap: {
                get: (key: string) => '123', // Mock paramMap.get()
              },
              queryParamMap: {
                get: (key: string) => 'example', // Mock queryParamMap.get() if needed
              },
            },
            // If your component uses .paramMap/.queryParamMap directly (Observable-based)
            paramMap: of(new Map([['id', '123']])), // Requires import { of } from 'rxjs'
            queryParamMap: of(new Map([['page', '1']])), // Mock queryParamMap if needed
          },
        },
      ],
    }).compileComponents()
  })

  it('should create the component', () => {
    const fixture = TestBed.createComponent(UserProfileComponent)
    const component = fixture.componentInstance
    expect(component).toBeTruthy()
  })
})

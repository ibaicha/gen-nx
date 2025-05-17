import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { NxWelcomeComponent } from './nx-welcome.component'
import { RouterModule } from '@angular/router'
import { ShareService } from './services/share.service'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { AppService } from './services/app.service'
import { ConfirmationService, MessageService } from 'primeng/api'
import { provideMockStore } from '@ngrx/store/testing'

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn()
  unobserve = jest.fn()
  disconnect = jest.fn()
}

describe('AppComponent', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: MockIntersectionObserver,
    })
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideMockStore({}),
        AppService,
        ShareService,
        MessageService,
        ConfirmationService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
      imports: [AppComponent, NxWelcomeComponent, RouterModule.forRoot([])],
    }).compileComponents()
  })

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Plateforme des Gestion des Organisations Paysannes',
    )
  })

  it(`should have as title 'GesOPs'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.title).toEqual('GesOPs')
  })
})

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CreditAgenceComponent } from './credit-agence.component'

describe('CreditAgenceComponent', () => {
  let component: CreditAgenceComponent
  let fixture: ComponentFixture<CreditAgenceComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditAgenceComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CreditAgenceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

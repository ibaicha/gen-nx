import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OpComponent } from './op.component'

describe('OpComponent', () => {
  let component: OpComponent
  let fixture: ComponentFixture<OpComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OpComponent],
    })
    fixture = TestBed.createComponent(OpComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

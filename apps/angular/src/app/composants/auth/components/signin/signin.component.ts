import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'
import { AuthService } from './../../shared/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class SigninComponent {
  signinForm: FormGroup

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
  ) {
    this.signinForm = this.fb.group({
      email: [''],
      password: [''],
    })
  }

  loginUser() {
    this.authService.signIn(this.signinForm.value)
  }
}

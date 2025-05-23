import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from './../../shared/auth.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
})
export class UserProfileComponent {
  currentUser: any = {}

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute,
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id')
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res.msg
    })
  }
}

import { Component, OnInit } from '@angular/core'
import { environment } from '../environments/environment.prod'
import { FooterComponent } from './composants/affichage/footer/footer.component'
import { Router, RouterOutlet } from '@angular/router'
import { NavbarComponent } from './composants/affichage/navbar/navbar.component'
import { HeaderComponent } from './composants/affichage/header/header.component'
import { CreditCampagneTitreComponent } from './composants/application/credit-campagne-titre/credit-campagne-titre.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    CreditCampagneTitreComponent,
  ],
})
export class AppComponent implements OnInit {
  title = 'Ges' + 'OPs'
  showLoader = false

  message = ''
  constructor(public router: Router) {}
  ngOnInit(): void {
    // Rediriger vers 'home' à chaque rafraîchissement
    this.router.navigate(['/home'])
    if (environment.production) {
      if (location.protocol === 'http:') {
        // window.location.href = location.href.replace('http', 'https');
      }
    }
  }
}

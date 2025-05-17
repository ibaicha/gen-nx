import { Component, OnInit } from '@angular/core'
import { LoginService } from '../../../services/login.service'
import { MessageService } from 'primeng/api'

import { Router } from '@angular/router'
import Swal from 'sweetalert2'
import { ShareService } from '../../../services/share.service'
import { OnlineOfflineService } from '../../../services/online-offline.service'
import { DbindexedService } from '../../../services/dbindexed.service'
import { AuthService } from '../../auth/shared/auth.service'
import { Tokener } from '../../../models/user'
import { MenuItem } from 'primeng/api'
import { User } from '../../auth/shared/user'
import { ButtonModule } from 'primeng/button'
import { MenubarModule } from 'primeng/menubar'
import { ToastModule } from 'primeng/toast'
import { MenuModule } from 'primeng/menu'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [ToastModule, MenubarModule, ButtonModule, MenuModule],
})
export class NavbarComponent implements OnInit {
  token = ''
  users = []
  user = []

  itemsDefaut: MenuItem[] = []

  newTokener: Tokener = new Tokener('')

  logger = []

  newLogin: any = {}

  estDesactive = false
  estVisibleMagasins = false
  estVisibleUnites = false

  estVisibleProgrammes = false

  MyselectedId = []
  NewLigne = []

  showMenu = false
  toggleNavbar() {
    this.showMenu = !this.showMenu
  }

  constructor(
    public router: Router,
    public loginService: LoginService,
    public dbindexedService: DbindexedService,
    private shareService: ShareService,
    public onlineOfflineService: OnlineOfflineService,
    private messageService: MessageService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.itemsDefaut = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        command: () => this.router.navigate(['/']),
      },
    ]
    this.selectNavProfile('defaut')
  }

  openDialog() {
    this.opensweetalertmsg()
  }

  disconnect() {
    this.close()

    this.router.navigate([''])
  }

  opensweetalertdng() {
    Swal.fire('Oops...', 'Something went wrong!', 'error')
  }

  opensweetalertcst() {
    Swal.fire({
      icon: 'info',
      title: "Ges'Assur",
      text: 'Version 1.0.0',
      footer:
        '© Copyright 2019 by <a href= https://www.cncas.sn/accueil target=_blank>La Banque Agricole</a>',
      showCancelButton: true,
      confirmButtonText: 'Ouvrir!',
      cancelButtonText: 'Fermer',
    }).then((result: any) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success',
        )
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error')
      }
    })
  }
  opensweetalertmsgX() {
    Swal.fire({
      title: "Ges'OPs",
      text: 'Version 1.0.0',
      backdrop: 'linear-gradient(yellow, orange)',
      background: 'white',
      allowOutsideClick: false,
      allowEscapeKey: false,
      footer:
        '©2023 &nbsp; <a href= https://www.cncas.sn/accueil target=_blank> SIS' +
        "'" +
        'Tech</a>',
      html: `
        <form id="loginForm">
          <img src="public/assets/images/lba_icone1.jpg" alt="LBA" width="100%" ><br><br>
          <table style="width:100%">
            <tr>
              <td bgcolor="#F8F9F9" width="10%" align="center"><i class="fas fa-user"></i></td>
              <td width="80%">
                <input 
                  matInput 
                  id="username" 
                  class="swal2-input" 
                  required 
                  minlength="4" 
                  placeholder="Compte Utilisateur" 
                  autocomplete="username"
                >
              </td>
            </tr>
            <tr *ngIf="!this.estDesactive">
              <td bgcolor="#F8F9F9" width="10%" align="center"><i class="fas fa-key"></i></td>
              <td width="80%">
                <input 
                  matInput 
                  id="password" 
                  class="swal2-input" 
                  type="password" 
                  required 
                  minlength="4" 
                  placeholder="Mot de passe" 
                  autocomplete="current-password"
                >
              </td>
            </tr>
          </table>
        </form>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const form = document.getElementById('loginForm') as HTMLFormElement
        if (form) {
          const username = form.querySelector('#username') as HTMLInputElement
          const password = form.querySelector('#password') as HTMLInputElement
          this.newLogin['username'] = username.value
          this.newLogin['password'] = password.value
        }
      },
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Ouvrir',
      cancelButtonText: 'Fermer',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      timer: 40000,
      timerProgressBar: true,
    }).then((result: any) => {
      if (result.isConfirmed) {
        console.log('this.newLogin username: ', this.newLogin.username)
        const user = new User()
        user.email = this.newLogin['username']
        user.password = this.newLogin['password']
        user._id = '0'
        user.name = 'name'
        console.log('user: ', user)
        this.save(user)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Vous avez décidé d'annuler!",
          footer: '<a href>Why do I have this issue?</a>',
          timer: 2000,
          showCancelButton: false,
          showCloseButton: false,
          showConfirmButton: false,
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        })
      }
    })
  }

  /**
   * Affiche une alerte de connexion avec un formulaire personnalisé
   */
  opensweetalertmsg() {
    // Configuration de l'alerte SweetAlert
    Swal.fire({
      // Titre de l'alerte
      title: "Ges'OPs",
      // Texte de l'alerte
      text: 'Version 1.0.0',
      // Fond de l'alerte
      backdrop: 'linear-gradient(yellow, orange)',
      // Couleur de fond de l'alerte
      background: 'white',
      // Autorise la fermeture de l'alerte en cliquant en dehors
      allowOutsideClick: false,
      // Autorise la fermeture de l'alerte avec la touche Échap
      allowEscapeKey: false,
      // Pied de page de l'alerte
      footer:
        ' 2023 &nbsp; <a href="https://www.cncas.sn/accueil" target="_blank">SIS\'Tech</a>',
      // Contenu HTML de l'alerte
      html: `
      <form id="loginForm">
        <img src="public/assets/images/lba_icone1.jpg" alt="LBA" width="100%" ><br><br>
        <table style="width:100%">
          <tr>
            <td bgcolor="#F8F9F9" width="10%" align="center"><i class="fas fa-user"></i></td>
            <td width="80%">
              <input 
                matInput 
                id="username" 
                class="swal2-input" 
                required 
                minlength="4" 
                placeholder="Compte Utilisateur" 
                autocomplete="username"
              >
            </td>
          </tr>
          <tr *ngIf="!this.estDesactive">
            <td bgcolor="#F8F9F9" width="10%" align="center"><i class="fas fa-key"></i></td>
            <td width="80%">
              <input 
                matInput 
                id="password" 
                class="swal2-input" 
                type="password" 
                required 
                minlength="4" 
                placeholder="Mot de passe" 
                autocomplete="current-password"
              >
            </td>
          </tr>
        </table>
      </form>
    `,
      // Fonction de validation avant la soumission du formulaire
      preConfirm: () => {
        // Récupération du formulaire
        const form = document.getElementById('loginForm') as HTMLFormElement
        if (form) {
          // Récupération des champs de saisie
          const username = form.querySelector('#username') as HTMLInputElement
          const password = form.querySelector('#password') as HTMLInputElement
          // Stockage des valeurs saisies dans l'objet newLogin
          this.newLogin['username'] = username.value
          this.newLogin['password'] = password.value
        }
      },
      // Configuration de l'animation d'affichage
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      // Configuration de l'animation de fermeture
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      // Affichage du bouton de confirmation
      showConfirmButton: true,
      // Affichage du bouton d'annulation
      showCancelButton: true,
      // Libellé du bouton de confirmation
      confirmButtonText: 'Ouvrir',
      // Libellé du bouton d'annulation
      cancelButtonText: 'Fermer',
      // Couleur du bouton de confirmation
      confirmButtonColor: '#3085d6',
      // Couleur du bouton d'annulation
      cancelButtonColor: '#d33',
      // Délai d'attente avant la fermeture automatique
      timer: 40000,
      // Affichage de la barre de progression
      timerProgressBar: true,
    }).then((result: any) => {
      // Traitement de la soumission du formulaire
      if (result.isConfirmed) {
        // Création d'un nouvel objet User
        const user = new User()
        user.email = this.newLogin['username']
        user.password = this.newLogin['password']
        user._id = '0'
        user.name = 'name'
        // Appel de la fonction de sauvegarde
        this.save(user)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Affichage d'un message d'erreur en cas d'annulation
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Vous avez décidé d'annuler!",
          footer: '<a href>Why do I have this issue?</a>',
          timer: 2000,
          showCancelButton: false,
          showCloseButton: false,
          showConfirmButton: false,
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        })
      }
    })
  }

  save(user: User) {
    /*
      const body = {
        "username": login['username'],
        "password": login['password']

      };
      */

    //this.loginService.UserConnexion.username =  body.username;
    //this.loginService.UserConnexion.password = body.password;

    /* SI ONLINE */
    if (this.onlineOfflineService.isOnline) {
      //alert('ON LINE');

      this.authService.signIn(user)
    } else {
      /* SI OFFLINE */
      alert('OFF LINE')
    }
  }

  ouvreLoggin() {
    this.shareService
      .getUser(
        this.shareService.makeHeader(),
        this.loginService.UserConnexion.user.id,
      )
      .subscribe((res: never[]) => {
        this.user = res
        console.log('this.user -------- ', this.user)
        this.loginService.UserConnexion.user.role.name =
          this.user[0]['profil_name']
      })
  }

  selectNavProfile(profil: string) {
    /*
    if (profil === 'Admin') {
      const itemsAdmins = [
        {
          label: 'Admin',
          icon: 'pi pi-map-marker',
          command: (event: Event) => this.openPointService(),
        },

        {
          label: 'Settings',
          icon: 'pi pi-fw pi-th-large',
          items: [
            {
              label: 'Zones',
              icon: 'pi pi-fw pi-chevron-right',
              command: (event: Event) => this.openZones(),
              items: [
                {
                  label: 'Sous Zones',
                  icon: 'pi pi-fw pi-chevron-right',
                  command: (event: Event) => this.openSousZones(),
                  items: [
                    {
                      label: 'Points de Collecte',
                      icon: 'pi pi-fw pi-chevron-right',
                      command: (event: Event) => this.openPointCollecte(),
                    },
                  ],
                },
              ],
            },
            {
              label: 'Agences',
              icon: 'pi pi-fw pi-chevron-right',
              command: (event: Event) => this.openAgences(),
            },
            {
              label: 'Unions',
              icon: 'pi pi-fw pi-chevron-right',
              command: (event: Event) => this.openUnions(),
            },

            {
              label: 'Utilisateurs',
              icon: 'pi pi-fw pi-users',
              command: (event: Event) => this.openUsers(),
            },
          ],
        },
      ]
    }

    if (profil === 'Agence') {
      const itemsAdmins = [
        {
          label: 'Agence',
          icon: 'pi pi-map-marker',
          command: (event: Event) => this.openPointService(),
        },
      ]
    }

    if (profil === 'Portefeuille') {
      const itemsConsultants = [
        {
          label: 'Portefeuille',
          icon: 'pi pi-map-marker',
          command: (event: Event) => this.openPointService(),
        },
      ]
    }

    if (profil === 'Courtier') {
      const itemsConsultants = [
        {
          label: 'Courtier',
          icon: 'pi pi-map-marker',
          command: (event: Event) => this.openPointService(),
        },
      ]
    }

    if (profil === 'Assure') {
      const itemsConsultants = [
        {
          label: 'Assure',
          icon: 'pi pi-map-marker',
          command: (event: Event) => this.openPointService(),
        },
      ]
    }
    */

    if (profil === 'defaut') {
      this.loginService.items = this.itemsDefaut
    }
  }

  close() {
    this.loginService.hideNav()
    this.loginService.UserConnexion.user.role.id = 0
    this.loginService.UserConnexion.user.email = ''
    this.loginService.UserConnexion.user.profile.firstName = ''
    this.loginService.UserConnexion.user.profile.lastName = ''
    this.loginService.UserConnexion.user.username = ''
    this.loginService.UserConnexion.user.role.name = ''
    this.loginService.titre = 'Système de Gestion des OPs'
    this.selectNavProfile('defaut')
    this.router.navigate(['/'])
  }

  async openslistprogrammes(programmes_connexion: any) {
    const { value: entrepotss } = await Swal.fire({
      icon: 'success',
      title: 'Liste des programmes',
      backdrop: 'linear-gradient(yellow, orange)',
      background: 'white',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      input: 'select',
      inputOptions: programmes_connexion,

      /*
      html: '<mat-form-field><mat-label>Lieux de stockage</mat-label><mat-select (selectionChange)="trouveLoggin()" [(ngModel)]="Id_emplacement_connexion">' +
          '<mat-option *ngFor="let emplacement of emplacements_connexion" [value]="emplacement.idEmplacement">{{emplacement.Emplacement}}</mat-option></mat-select></mat-form-field>',
*/

      timer: 30000,
      timerProgressBar: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      inputPlaceholder: 'Choisir un programme',
      showCancelButton: true,
      confirmButtonText: 'Valider',
      cancelButtonText: 'Fermer',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputValidator: (value: string) => {
        return new Promise((resolve) => {
          if (value !== '') {
            // resolve()
          } else {
            resolve('Choisir un programme :)')
          }
        })
      },
    })
  }

  openZones() {
    this.router.navigate(['/zones'])
  }

  openSousZones() {
    this.router.navigate(['/souszones'])
  }

  openUsers() {
    this.router.navigate(['/users'])
  }

  openEntites() {
    this.router.navigate(['/entites'])
  }

  openPosts() {
    this.router.navigate(['/posts'])
  }

  openAgences() {
    this.router.navigate(['/agences'])
  }

  openUnions() {
    this.router.navigate(['/unions'])
  }

  openHome() {
    this.router.navigate(['/'])
  }

  openPointService() {
    this.router.navigate(['/pointservice'])
  }

  openPointCollecte() {
    this.router.navigate(['/pointcollecte'])
  }
}

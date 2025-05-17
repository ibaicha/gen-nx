import { Injectable } from '@angular/core'
import { User } from './user'
import { Observable, throwError } from 'rxjs'
import { AppService } from '../../../services/app.service'
import { catchError, map, tap } from 'rxjs/operators'
import { Router } from '@angular/router'
import { MenuItem } from 'primeng/api'
import { Store, select } from '@ngrx/store'
/*
import * as fromAnnees from '../../../store/annee'
import * as fromLocalites from '../../../store/localite'
import * as fromFormesJuridiques from '../../../store/forme_juridique'
import * as fromPoints from '../../../store/point'
import * as fromSaisons from '../../../store/saison'
import * as fromCampagnes from '../../../store/campagne'
*/
import * as fromVarietes from '../../../store/variete'

import * as fromOps from '../../../store/op'
import * as fromConstantes from '../../../store/constante'
import * as fromChargeExploitations from '../../../store/charge_exploitation'

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http'

import { LoginService } from '../../../services/login.service'

import { IChargeExploitation } from '../../../interfaces/exploitation.interface'
import {
  IAnnee,
  ICampagne,
  IFormeJuridique,
  ILocalite,
  IOp,
  IPoint,
  IPointAgence,
  IProduit,
  ISaison,
  IVariete,
} from '@shared-models'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // endpoint: string = 'http://localhost:4000/api';
  endpoint: string
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  currentUser = {}

  itemsDefaut: MenuItem[] = [
    {
      label: 'HOME',
      icon: 'pi pi-fw pi-home',
      command: () => this.navigateTo('/home'),
    },
  ]

  campagnes$!: Observable<ICampagne[]>
  campagnes: ICampagne[] = []

  varietes$!: Observable<IVariete[]>
  varietes: IVariete[] = []
  allProduitsBrut: IProduit[] = []

  filteredVarietesBrut$!: Observable<IVariete[]>
  filteredVarietesBrut: IVariete[] = []

  annees$!: Observable<IAnnee[]>
  annees: IAnnee[] = []

  saisons$!: Observable<ISaison[]>
  saisons: ISaison[] = []

  points$!: Observable<IPoint[]>
  points: IPoint[] = []

  localites$!: Observable<ILocalite[]>
  localites: ILocalite[] = []

  formeJuridiques$!: Observable<IFormeJuridique[]>
  formeJuridiques: IFormeJuridique[] = []

  pointsFromAgence$!: Observable<IPointAgence[]>
  pointsFromAgence: IPointAgence[] = []

  chargeExploitations$!: Observable<IChargeExploitation[]>
  chargeExploitations: IChargeExploitation[] = []

  selectedOp: any
  filteredOps: any[] | undefined
  ops$: Observable<IOp[]> | undefined
  ops: IOp[] = []
  op: any = {}
  selectedOps: IOp[] | undefined

  mesOps: any[] = []

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private appService: AppService,
    public router: Router,
    private readonly store: Store,
  ) {
    this.endpoint = this.appService.getUrl('')
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    const api = `${this.endpoint}/register-user`
    return this.http.post(api, user).pipe(catchError(this.handleError))
  }

  /**
   * Initialise les dispatchers pour récupérer les données des différentes entités
   */
  private initDispatch(): void {
    /*
    // Récupération des campagnes
    // this.store.dispatch(fromCampagnes.getCampagnes())
    // this.campagnes$ = this.store.pipe(select(fromCampagnes.selectCampagnesList))

    // Récupération des années
    // this.store.dispatch(fromAnnees.getAnnees())
    // this.annees$ = this.store.pipe(select(fromAnnees.selectAnneesList))

    // Récupération des saisons
    // this.store.dispatch(fromSaisons.getSaisons())
    // this.saisons$ = this.store.pipe(select(fromSaisons.selectSaisonsList))

    // Récupération des localites
    // this.store.dispatch(fromLocalites.getLocalites())
    // this.localites$ = this.store.pipe(select(fromLocalites.selectLocalitesList))

    // Récupération des formes juridiques
    // this.store.dispatch(fromFormesJuridiques.getFormeJuridiques())
    // this.formeJuridiques$ = this.store.pipe(select(fromFormesJuridiques.selectFormeJuridiquesList),)

    // Récupération des variétés
    // this.store.dispatch(fromVarietes.getVarietes())
    // this.varietes$ = this.store.pipe(select(fromVarietes.selectVarietesList))

    // Récupération des points
    // this.store.dispatch(fromPoints.getPoints())
    // this.points$ = this.store.pipe(select(fromPoints.selectPointsList))
    */

    this.store.dispatch(fromConstantes.loadConstante())
    this.annees$ = this.store.pipe(select(fromConstantes.selectAnnees))
    this.saisons$ = this.store.select(fromConstantes.selectSaisons)
    this.campagnes$ = this.store.select(fromConstantes.selectCampagnes)
    this.formeJuridiques$ = this.store.select(
      fromConstantes.selectFormeJuridiques,
    )
    this.localites$ = this.store.select(fromConstantes.selectLocalites)
    this.varietes$ = this.store.select(fromConstantes.selectVarietes)

    this.filteredVarietesBrut$ = this.store
      .select(fromConstantes.selectVarietes)
      .pipe(
        map((varietes) =>
          varietes.filter(
            (v) => v.produit?.familleEmplacement?.name === 'BRUT',
          ),
        ),
      )
    console.log('this.filteredVarietesBrut$: ', this.filteredVarietesBrut$)
    this.filteredVarietesBrut$.subscribe((data) => {
      this.filteredVarietesBrut = data
      console.log('this.filteredVarietesBrut: ', this.filteredVarietesBrut)
    })

    this.points$ = this.store.select(fromConstantes.selectPoints)

    // Récupération des charges d'exploitation
    this.store.dispatch(fromChargeExploitations.getChargeExploitations())
    this.chargeExploitations$ = this.store.pipe(
      select(fromChargeExploitations.selectChargeExploitationsList),
    )
  }

  /**
   * Effectue la connexion de l'utilisateur et initialise les données nécessaires.
   */
  signIn(user: User) {
    // Initialiser les dispatchers pour charger les données depuis le store
    console.log('Initialisation des données...')
    this.initDispatch()

    /**
     * Traite les données d'un observable et met à jour les propriétés correspondantes.
     *
     * @template T - Type des éléments dans l'observable.
     * @param observable$ - Observable contenant les données.
     * @param targetArray - Nom de la propriété locale à mettre à jour.
     * @param serviceProperty - Nom de la propriété dans le service LoginService à mettre à jour.
     */
    const processData = <T>(
      observable$: Observable<T[]>,
      targetArray: keyof this,
      serviceProperty: keyof LoginService,
    ) => {
      observable$
        .pipe(
          tap((data) =>
            console.log(
              `Données reçues pour ${String(serviceProperty)}:`,
              data,
            ),
          ),
        )
        .subscribe({
          next: (data: T[]) => {
            const processedData = data.map((item) => ({ ...item }))
            ;(this[targetArray] as T[]) = processedData
            ;(this.loginService[serviceProperty] as T[]) = processedData
          },
          error: (err) =>
            console.error(
              `Erreur lors du traitement de ${String(serviceProperty)}:`,
              err,
            ),
        })
    }

    // Gestion des données
    processData(this.campagnes$, 'campagnes', 'selectedCampagne')
    processData(this.varietes$, 'varietes', 'allVarietes')
    processData(this.annees$, 'annees', 'allAnnees')
    processData(this.saisons$, 'saisons', 'allSaisons')
    processData(this.localites$, 'localites', 'allLocalites')
    processData(this.formeJuridiques$, 'formeJuridiques', 'allFormeJuridiques')
    processData(this.points$, 'points', 'allPoints')
    processData(
      this.chargeExploitations$,
      'chargeExploitations',
      'allChargeExploitations',
    )

    // Initialisation des valeurs dans le localStorage
    this.initializeLocalStorage()

    // Effectuer l'appel HTTP pour la connexion
    console.log('Envoi des informations de connexion...')
    return this.http
      .post<{ token: string; user: User }>(`${this.endpoint}/auth/signin`, user)
      .pipe(
        tap((res: { token: string; user: User }) => {
          console.log('Réponse de connexion:', res)
          this.saveUserInfo(res)
          console.log('this.loginService: ', this.loginService)
        }),
      )
      .subscribe({
        next: (res: { token: string; user: User }) => {
          console.log(' ✅ ✅ ✅ ✅ ✅ ✅ Utilisateur connecté:', res.user)
        },
        error: (error: HttpErrorResponse) => {
          console.error('Erreur lors de la connexion:', error)
        },
      })
  }

  /**
   * Initialise les valeurs par défaut dans le localStorage.
   */
  private initializeLocalStorage() {
    console.log('Initialisation du localStorage...')
    localStorage.setItem('selectedChargeExploitationId', '')
    localStorage.setItem('selectedChargeExploitationName', '')
    localStorage.setItem('selectedChargeExploitationUniteId', '')
    localStorage.setItem('selectedChargeExploitationUniteName', '')
    localStorage.setItem('selectedPointId', '0')
    localStorage.setItem('selectedLotId', '0')
    localStorage.setItem('selectedSocieteId', '')
    localStorage.setItem('selectedSocieteName', '')
    localStorage.setItem('selectedOpId', '')
    localStorage.setItem('selectedOpName', '')
    localStorage.setItem('selectedExploitationId', '')
    localStorage.setItem('selectedAgenceId', '')
    localStorage.setItem('selectedAgenceName', '')

    localStorage.setItem('selectedAnneeId', '')
    localStorage.setItem('selectedAnneeName', '')

    localStorage.setItem('selectedSaisonId', '')
    localStorage.setItem('selectedSaisonName', '')

    localStorage.setItem('selectedVarieteId', '')
    localStorage.setItem('selectedVarieteName', '')

    localStorage.setItem('selectedProduitBrutId', '')
    localStorage.setItem('selectedProduitBrutName', '')
    localStorage.setItem('selectedProduitBruitIds', '')

    localStorage.setItem('selectedCampagneAnneeId', '')
    localStorage.setItem('selectedCampagneSaisonId', '')
  }

  /**
   * Sauvegarde les informations utilisateur et les tokens dans le localStorage.
   */
  /**
   * Sauvegarde les informations utilisateur dans le localStorage.
   *
   * @param res - Réponse contenant les informations utilisateur et le token.
   */
  private saveUserInfo(res: any) {
    console.log('Sauvegarde des informations utilisateur...')

    this.loginService.UserConnexion.user = res.user
    this.loginService.mySelectedSaison = this.saisons.find(
      (item) => item.id == this.campagnes[0].saisonId,
    )
    this.loginService.mySelectedAnnee = this.annees.find(
      (item) => item.id == this.campagnes[0].anneeId,
    )

    this.loginService.mySelectedVariete = this.varietes[0]

    const varietesBrutFiltres: IVariete[] = this.varietes.filter(
      (variete) => variete.produit?.familleEmplacement?.id === 1,
    )

    // Utiliser un Set pour éliminer les doublons
    const produitsBrutSet: Set<string> = new Set(
      varietesBrutFiltres
        .map((paquet) => paquet.produit?.name)
        .filter((name): name is string => name !== undefined),
    )
    // Créer une liste distincte d'objets de produit
    const produitsBrutDistincts: IProduit[] = Array.from(produitsBrutSet)
      .map(
        (nomProduit) =>
          this.varietes.find((paquet) => paquet.produit?.name === nomProduit)
            ?.produit,
      )
      .filter(Boolean) as IProduit[]
    this.allProduitsBrut = produitsBrutDistincts
    /*
    console.log(
      '✅ ✅ ✅ ✅ ✅ ✅ this.allProduitsBrut : ',
      this.allProduitsBrut,
    )
*/
    //DEBUT
    if (res.user.role.name === 'Societe') {
      this.loginService.titre = res.user.userSocietes[0].societe.name
      localStorage.setItem(
        'selectedSocieteId',
        res.user.userSocietes[0].societe.id,
      )
      localStorage.setItem(
        'selectedSocieteName',
        res.user.userSocietes[0].societe.name,
      )

      this.loginService.titre = res.user.userSocietes[0].societe.name

      this.loginService.UserConnexion.user.userSocietes =
        res.user.userSocietes[0].societe
    }
    if (res.user.role.name === 'Agence') {
      //console.log(res.user.userAgences[0].agence.name)
      this.loginService.UserConnexion.user.userAgences.idAgence = res.user
        .userAgences[0].agence.id as number
      this.loginService.UserConnexion.user.userAgences.name =
        res.user.userAgences[0].agence.name
      this.loginService.titre = res.user.userAgences[0].agence.name

      localStorage.setItem(
        'selectedSocieteId',
        res.user.userAgences[0].agence.societe.id,
      )
      localStorage.setItem(
        'selectedSocieteName',
        res.user.userAgences[0].agence.societe.name,
      )

      localStorage.setItem(
        'selectedAgenceId',
        res.user.userAgences[0].agence.id,
      )

      localStorage.setItem(
        'selectedAgenceName',
        res.user.userAgences[0].agence.name,
      )
      this.store.dispatch(
        fromOps.getAllOpsCustomFromAgence({
          agenceId: this.appService.getLocalselectedAgenceId(),
        }),
      )

      this.ops$ = this.store.pipe(
        select(fromOps.selectCustomCreditSocieteVarieteAnneeSaisonList),
      )

      this.ops$.subscribe((data: any[]) => {
        this.ops = data
        this.ops = data.map((device: any) => {
          return { ...device }
        })

        this.loginService.allOpsAgenceFinanciers = this.ops

        this.mesOps = this.ops.map(({ id, name }) => ({ id, name }))
      })
    }

    if (res.user.role.name === 'Admin') {
      this.loginService.titre = 'Administration'
    }
    this.selectNavProfile(res.user.role.name)
    this.loginService.showNav()
    //FIN

    // Sauvegarde du token
    localStorage.setItem('access_token', res.token)

    // Récupération des campagnes, années et saisons sélectionnées
    const selectedAnnee = this.annees.find(
      (item) => item.id === this.campagnes[0]?.anneeId,
    )

    const selectedSaison = this.saisons.find(
      (item) => item.id === this.campagnes[0]?.saisonId,
    )
    const selectedVariete = this.varietes[0]
    const selectedProduitBrut = this.allProduitsBrut[0]

    // Vérification et sauvegarde des informations de l'année
    if (selectedAnnee) {
      //console.log('Année sélectionnée:', selectedAnnee)
      localStorage.setItem('selectedAnneeId', selectedAnnee.id.toString())
      localStorage.setItem('selectedAnneeName', selectedAnnee.name)
      localStorage.setItem(
        'selectedCampagneAnneeId',
        selectedAnnee.id.toString(),
      )
    } else {
      console.warn("Aucune année sélectionnée n'a été trouvée.")
    }

    // Vérification et sauvegarde des informations de la saison
    if (selectedSaison) {
      //console.log('Saison sélectionnée:', selectedSaison)
      localStorage.setItem('selectedSaisonId', selectedSaison.id.toString())
      localStorage.setItem('selectedSaisonName', selectedSaison.name)
      localStorage.setItem(
        'selectedCampagneSaisonId',
        selectedSaison.id.toString(),
      )
    } else {
      console.warn("Aucune saison sélectionnée n'a été trouvée.")
    }

    // Vérification et sauvegarde des informations de la variété
    if (selectedVariete) {
      //console.log('✅ ✅ ✅ ✅ ✅ ✅  Variété sélectionnée:', selectedVariete)
      localStorage.setItem('selectedVarieteId', selectedVariete.id.toString())
      localStorage.setItem('selectedVarieteName', selectedVariete.name)
    } else {
      console.warn("Aucune variété sélectionnée n'a été trouvée.")
    }

    // Vérification et sauvegarde des informations de la variété
    if (selectedProduitBrut) {
      /*
      console.log(
        '✅ ✅ ✅ ✅ ✅ ✅  Produit Brut sélectionnée:',
        selectedProduitBrut,
      )
      */
      localStorage.setItem(
        'selectedVarieteBrutId',
        selectedProduitBrut.id.toString(),
      )
      localStorage.setItem('selectedVarieteBrutName', selectedProduitBrut.name)
    } else {
      console.warn("Aucune produit brut sélectionnée n'a été trouvée.")
    }
  }

  /**
   * Récupère le profil utilisateur.
   */
  getUserProfile(id: any): Observable<any> {
    const api = `${this.endpoint}/profiles/${id}`
    //console.log(`Récupération du profil pour l'utilisateur ID: ${id}`)
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.handleError),
    )
  }

  getToken() {
    return localStorage.getItem('access_token')
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token')
    return authToken !== null ? true : false
  }

  doLogout() {
    const removeToken = localStorage.removeItem('access_token')
    if (removeToken == null) {
      this.router.navigate(['log-in'])
    }
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = ''
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    return throwError(() => new Error(msg))
  }

  selectNavProfile(profil: string) {
    const profileItems: { [key: string]: MenuItem[] } = {
      Admin: [
        {
          label: 'ADMIN',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/filieres'),
        },
        {
          label: 'SETTINGS',
          icon: 'pi pi-fw pi-th-large',
          items: [
            {
              label: 'Zones',
              icon: 'pi pi-fw pi-chevron-right',
              command: () => this.openFiliere(),
              items: [
                {
                  label: 'Sous Zones',
                  icon: 'pi pi-fw pi-chevron-right',
                  command: () => this.openFiliere(),
                  items: [
                    {
                      label: 'Points de Collecte',
                      icon: 'pi pi-fw pi-chevron-right',
                      command: () => this.openFiliere(),
                    },
                  ],
                },
              ],
            },
            {
              label: 'Agences',
              icon: 'pi pi-fw pi-chevron-right',
              command: () => this.openFiliere(),
            },
            {
              label: 'Unions',
              icon: 'pi pi-fw pi-chevron-right',
              command: () => this.openFiliere(),
            },
            {
              label: 'Utilisateurs',
              icon: 'pi pi-fw pi-users',
              command: () => this.openFiliere(),
            },
          ],
        },
      ],
      Societe: [
        {
          label: 'OPS',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/ops'),
        },
        {
          label: 'CREDITS AGENCE',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/credit-agence'),
        },
        {
          label: 'CREDITS SOCIETE',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/credit-societe'),
        },
        {
          label: 'STOKS PAR POINTS',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/point-mouvement-intrant'),
        },
        {
          label: 'STOCKS PAR INTRANTS',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/stock-mouvement-intrant'),
        },
      ],
      Agence: [
        {
          label: 'OPS',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/ops'),
        },
        {
          label: 'PORTE FEUILLE',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/clients'),
        },
        {
          label: 'CREDITS AGENCE',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/credit-agence'),
        },
        {
          label: 'CREDITS AGENCEXX',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/credit-campagne'),
        },
        {
          label: 'STOKS PAR POINTS',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/point-mouvement-intrant'),
        },
        {
          label: 'STOCKS PAR INTRANTS',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/stock-mouvement-intrant'),
        },
      ],
      defaut: [],
    }

    this.loginService.items = this.itemsDefaut.concat(
      profileItems[profil] || [],
    )
  }

  navigateTo(route: string) {
    console.log('Navigating to', route)
    this.router.navigate(['/' + route])
  }

  navigateForceTo(route: string) {
    console.log('Navigating to', route)
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/' + route])
    })
  }

  openHome() {
    this.router.navigate(['/'])
  }
  openFiliere() {
    this.router.navigate(['/filieres'])
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

  openPointService() {
    this.router.navigate(['/pointservice'])
  }

  openPointCollecte() {
    this.router.navigate(['/pointcollecte'])
  }
}

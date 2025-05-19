import { AppService } from './../../../services/app.service'
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Observable, Subject, Subscription } from 'rxjs'
import { ISumCredit } from '../../../interfaces/credit.interface'
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms'
import { DialogModule } from 'primeng/dialog'
import { DialogService } from 'primeng/dynamicdialog'
import { StepsModule } from 'primeng/steps'
import { PanelModule } from 'primeng/panel'
import { MessageModule } from 'primeng/message'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { MessagesModule } from 'primeng/messages'
import { MultiSelectModule } from 'primeng/multiselect'

import { ProgressSpinnerModule } from 'primeng/progressspinner'

import {
  MessageService,
  ConfirmationService,
  MenuItem,
  PrimeNGConfig,
} from 'primeng/api'
import { Store, select } from '@ngrx/store'
import * as fromCreditsAgences from '../../../store/credit_agence'
import * as fromOps from '../../../store/op'
import * as fromExploitations from '../../../store/exploitation'
import * as fromPointAgences from '../../../store/point_agence'
import * as fromRemboursements from '../../../store/remboursement'
import * as fromMouvementStockages from '../../../store/mouvement_stockage'
import * as fromAgences from '../../../store/agence'

import { InputTextModule } from 'primeng/inputtext'
import { Table, TableModule } from 'primeng/table'
import { ChipModule } from 'primeng/chip'
import { AccordionModule } from 'primeng/accordion'
import { ButtonModule } from 'primeng/button'
import { ToolbarModule } from 'primeng/toolbar'
import { CardModule } from 'primeng/card'
import { FieldsetModule } from 'primeng/fieldset'
import { InputNumberModule } from 'primeng/inputnumber'
import { CalendarModule } from 'primeng/calendar'
import { TooltipModule } from 'primeng/tooltip'
import { DropdownModule } from 'primeng/dropdown'
import { NgIf } from '@angular/common'
import { ToastModule } from 'primeng/toast'
import { AutoCompleteModule } from 'primeng/autocomplete'
//import { ClientService } from '../../../services/client.service'
import { CreditService } from '../../../services/credit.service'
import { LoginService } from '../../../services/login.service'

import { Location } from '@angular/common'

import { ProgressBarModule } from 'primeng/progressbar'

import { PointAgenceService } from '../../../services/point-agence.service'

import {
  GetCreditAgenceParamsDTO,
  GetOpParamsDTO,
  IAgence,
  IAgenceOp,
  IAnnee,
  ICampagne,
  ICreditAgence,
  IFormeJuridique,
  ILocalite,
  IOp,
  IPointAgence,
  IProduit,
  IRemboursementAgence,
  ISaison,
  ISociete,
  ISocieteOp,
  ISumCreditAgence,
  IVariete,
  SelectItem,
} from '@shared-models'

import { AuthService } from '../../auth/shared/auth.service'
import { NavigationService } from '../../../services/navigation.service'
import { FormatNumberSuffixePipe } from '../../../shared/format-number-suffixe.pipe'

export enum PageNames {
  DebutPage,
  FinPage,
}

@Component({
  selector: 'app-credit-agence',
  standalone: true,

  templateUrl: './credit-agence.component.html',
  styleUrl: './credit-agence.component.css',
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    ButtonModule,
    ConfirmDialogModule,
    MessageModule,
    MessagesModule,
    PanelModule,
    FormsModule,
    ReactiveFormsModule,
    StepsModule,
    DialogModule,
    CommonModule,
    InputTextModule,
    DropdownModule,
    MessageModule,
    TableModule,
    ChipModule,
    CardModule,
    AccordionModule,
    AutoCompleteModule,
    FieldsetModule,
    InputTextModule,
    CalendarModule,
    InputNumberModule,
    TooltipModule,
    ButtonModule,
    ToolbarModule,
    MultiSelectModule,
    NgIf,
    ToastModule,
    FormatNumberSuffixePipe,
  ],
})
export class CreditAgenceComponent implements OnInit {
  colsCredit: {
    field: string
    header: string
    sort?: boolean
    filter?: boolean
  }[] = []
  colsOps: {
    field: string
    header: string
    sort?: boolean
    filter?: boolean
  }[] = []
  colsCreditCustom: {
    field: string
    header: string
    sort?: boolean
    filter?: boolean
  }[] = []
  colsCreditsAgences: {
    field: string
    header: string
    sort?: boolean
    filter?: boolean
  }[] = []
  colsRemboursements: {
    field: string
    header: string
    sort?: boolean
    filter?: boolean
  }[] = []
  @ViewChild('dt') dt!: Table
  @ViewChild('mapElement') mapElement!: ElementRef

  PageNames = PageNames
  dialogPageIndex = PageNames.DebutPage

  dialogPages: MenuItem[] = [
    { label: 'Crédit' },
    { label: "Compte d'exploitation" },
  ]

  private unsubscribe$ = new Subject<void>()
  submitted = false

  loading = false
  loadingNavigation = false
  progress = 50 // Remplacez cela par votre variable de pourcentage réelle
  calendarIcon = 'pi pi-calendar'

  animateCell = false
  activeAddCredit = false
  selectedDate: Date | null = null
  dateAffichee: string | null = null

  annees: IAnnee[] = []
  selectedAnnee: IAnnee | undefined

  selectedSaisonId: number | null = null
  selectedAnneeId: number | null = null
  varietes: IVariete[] = []
  selectedVarieteId: number | undefined

  selectItemGroupVarietes: SelectItem[] = []
  selectedVariete: IVariete | undefined
  selectedVarieteDialog: IVariete | undefined

  produitsBruit: IProduit[] = []

  selectedProduitBruitIds: number[] = []

  campagnes$!: Observable<ICampagne[]>
  campagnes: ICampagne[] = []
  selectedCampagne: ICampagne | undefined

  saisons: ISaison[] = []
  selectedSaison: ISaison | undefined

  localites: ILocalite[] = []
  selectedLocalite: ILocalite | undefined

  formeJuridiques: IFormeJuridique[] = []
  selectedFormeJuridique: IFormeJuridique | undefined

  societes$!: Observable<ISociete[]>
  societes: ISociete[] = []
  societe: ISociete = {} as ISociete
  selectedSociete: ISociete | undefined

  agences$!: Observable<IAgence[]> | undefined
  agences: IAgence[] = []
  selectedAgenceIds: number[] = []
  selectedAgences: IAgence[] = []

  creditGroupsAgence: { [agenceId: number]: ICreditAgence[] } = {}
  creditSumGroupsAgence: { [agenceId: number]: ISumCreditAgence } = {}

  creditSumSociete: ISumCreditAgence = {
    id: 0,
    sumCapitals: 0,
    sumCapitalsFormatString: '',
    sumInterets: 0,
    sumInteretsFormatString: '',
    sumMoratoires: 0,
    sumMoratoiresFormatString: '',
    sumAutresEngagements: 0,
    sumAutresEngagementsFormatString: '',
    sumExigibles: 0,
    sumExigiblesFormatString: '',
    sumRemboursements: 0,
    sumRemboursementsFormatString: '',
    sumTauxRemboursement: 0,
    sumtauxRemboursementFormatString: '',
  }

  creditGroups: { [pointId: number]: ICreditAgence[] } = {}
  creditSumGroups: { [pointId: number]: ISumCreditAgence } = {}

  creditSumAgence: ISumCredit = {
    sumCapitals: '0 FCFA',
    sumMoratoires: '0 FCFA',
    sumInterets: '0 FCFA',
    sumAutresEngagements: '0 FCFA',
    sumExigibles: '0 FCFA',
    sumRemboursements: '0 FCFA',
  }

  /************************************** */

  opsWithFilters$!: Observable<IOp[]>
  private opsWithFiltersSubscription: Subscription | undefined
  opsWithFilters: IOp[] = []
  opsAddRowsWithFilters: any[] = []
  op: IOp = {} as IOp
  selectedopsWithFilters: IOp[] | undefined

  editedOpsWithFiltersRows: any[] = []
  originalOpsWithFiltersData: any[] = []

  ops$: Observable<IOp[]> | undefined
  ops: IOp[] = []
  selectedOps: IOp[] | undefined

  creditsAgencesWithFilters$!: Observable<ICreditAgence[]>
  private creditsAgencesWithFiltersSubscription: Subscription | undefined
  creditsAgencesWithFilters: ICreditAgence[] = []
  creditAgence: ICreditAgence = {} as ICreditAgence
  selectedcreditsAgencesWithFilters: ICreditAgence[] | undefined

  agencesOpsWithFilters$!: Observable<IAgenceOp[]>
  private agencesOpsWithFiltersSubscription: Subscription | undefined
  agencesOpsWithFilters: IAgenceOp[] = []
  agenceOp: IAgenceOp = {} as IAgenceOp
  selectedagencesOpsWithFilters: IAgenceOp[] | undefined

  pointsCollectesFromAgence$!: Observable<IPointAgence[]>
  private pointsCollectesFromAgenceSubscription: Subscription | undefined
  pointsCollectesFromAgence: IPointAgence[] = []
  pointFromAgence: IPointAgence | undefined = undefined
  selectedpointsCollectesFromAgence: IPointAgence[] | undefined

  pointsCollectesFromSociete$!: Observable<IPointAgence[]>
  private pointsCollectesFromSocieteSubscription: Subscription | undefined
  pointsCollectesFromSociete: IPointAgence[] = []
  pointFromSociete: any = {}
  selectedpointsCollectesFromSociete: IPointAgence[] | undefined

  /**************************************** */
  tableCreditsFilters: { [s: string]: any } = {}

  displayAddCredit = false

  constructor(
    private readonly store: Store,
    private location: Location,
    //public clientService: ClientService,
    public appService: AppService,
    public loginService: LoginService,
    public authService: AuthService,
    public dialogService: DialogService,
    public creditService: CreditService,
    private fb: FormBuilder,
    public pointAgenceService: PointAgenceService,
    private navigationService: NavigationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
  ) {
    this.varietes = this.loginService.allVarietes.map((device: any) => {
      return { ...device }
    })

    this.produitsBruit = this.authService.allProduitsBrut

    this.annees = this.loginService.allAnnees.map((device: IAnnee) => {
      return { ...device }
    })

    this.localites = this.loginService.allLocalites.map((device: ILocalite) => {
      return { ...device }
    })

    this.formeJuridiques = this.loginService.allFormeJuridiques.map(
      (device: IFormeJuridique) => {
        return { ...device }
      },
    )

    this.saisons = this.loginService.allSaisons.map((device: ISaison) => {
      return { ...device }
    })

    this.selectedSaisonId = this.appService.getLocalselectedCampagneSaisonId()
    this.selectedAnneeId = this.appService.getLocalselectedCampagneAnneeId()

    this.pointsCollectesFromAgence$ = this.store.pipe(
      select(
        fromPointAgences.selectPointCustomListFromAgence(
          this.loginService.UserConnexion.user.userAgences.idAgence,
        ),
      ),
    )

    this.pointsCollectesFromSociete$ = this.store.pipe(
      select(
        fromPointAgences.selectPointCustomListFromAgenceFromSociete(
          parseInt(this.appService.getLocalselectedSocieteId()),
        ),
      ),
    )
    this.agences$ = this.store.pipe(select(fromAgences.selectAgencesList))
    this.agences$.subscribe((data: IAgence[]) => {
      this.agences = data.map((device: IAgence) => {
        return { ...device }
      })

      // console.log(' ✅ ✅ ✅ ✅ ✅ ✅  AVANT this.agences', this.agences)
      this.agences = this.agences.filter(
        (agence) =>
          agence.societeId ===
          parseInt(this.appService.getLocalselectedSocieteId()), // this.appService.getLocalselectedSocieteId(),
      )
      // console.log(' ✅ ✅ ✅ ✅ ✅ ✅  APRES this.agences', this.agences)
      if (this.selectedAgenceIds.length === 0) {
        this.selectedAgences = this.agences
      } else {
        this.selectedAgences = this.agences.filter((a) =>
          this.selectedAgenceIds.includes(a.id),
        )
      }
    })

    // this.selectedAgences = this.agences
  }

  async ngOnInit() {
    this.selectedSaison = this.loginService.mySelectedSaison
    console.log(
      'this.loginService.mySelectedSaison',
      this.loginService.mySelectedSaison,
    )

    localStorage.setItem(
      'selectedSaisonId',

      this.loginService.mySelectedSaison?.id?.toString() || '',
    )
    localStorage.setItem(
      'selectedSaisonName',

      this.loginService.mySelectedSaison?.name?.toString() || '',
    )

    this.selectedAnnee = this.loginService.mySelectedAnnee
    console.log(
      'this.loginService.mySelectedAnnee',
      this.loginService.mySelectedAnnee,
    )
    localStorage.setItem(
      'selectedAnneeId',
      this.loginService.mySelectedAnnee?.id?.toString() ?? '',
    )
    localStorage.setItem(
      'selectedAnneeName',
      this.loginService.mySelectedAnnee?.name?.toString() || '',
    )

    this.selectedVariete = undefined // Initialisé avec la valeur "Aucun"

    localStorage.setItem(
      'selectedVarieteId',
      this.loginService.mySelectedVariete?.id?.toString() || '',
    )
    localStorage.setItem(
      'selectedVarieteName',
      this.loginService.mySelectedVariete?.name?.toString() || '',
    )
    this.selectedVarieteId = parseInt(
      this.appService.getLocalselectedVarieteId(),
    )

    this.colsOps = [
      { field: 'id', header: 'ID', sort: false, filter: false },

      { field: 'localite', header: 'LOCALITE', sort: true, filter: true },
      { field: 'formeJuridique', header: 'F.J', sort: true, filter: true },
      {
        field: 'name',
        header: 'O.P',
        sort: true,
        filter: true,
      },
      {
        field: 'compte',
        header: 'COMPTE',
        sort: true,
        filter: true,
      },
      {
        field: 'capital',
        header: 'CAPITAL',
        sort: true,
        filter: true,
      },
      {
        field: 'interet',
        header: 'INTERET',
        sort: true,
        filter: true,
      },
      {
        field: 'moratoire',
        header: 'MORATOIRE',
        sort: true,
        filter: true,
      },
      {
        field: 'autres_engagements',
        header: 'AUTRES',
        sort: true,
        filter: true,
      },
      {
        field: 'exigible',
        header: 'EXIGIBLE',
        sort: true,
        filter: true,
      },
    ]

    this.colsRemboursements = [
      { field: 'id', header: 'ID', sort: false, filter: false },
      { field: 'date', header: 'DATE', sort: true, filter: true },
      {
        field: 'typeRemboursementName',
        header: 'TYPE',
        sort: true,
        filter: true,
      },
      { field: 'emballageName', header: 'EMBALLAGE', sort: true, filter: true },
      { field: 'quantiteFormat', header: 'QUANTITE', sort: true, filter: true },
      { field: 'puFormat', header: 'PU', sort: true, filter: true },
      { field: 'valeurFormat', header: 'VALEUR', sort: true, filter: true },
    ]

    this.colsCreditsAgences = [
      { field: 'id', header: 'ID', sort: false, filter: false },
      { field: 'formeJuridique', header: 'F.J', sort: true, filter: true },
      { field: 'nameOp', header: 'NOM', sort: true, filter: true },
      { field: 'localite', header: 'LOCALITE', sort: true, filter: true },
      { field: 'compte', header: 'COMPTE', sort: true, filter: true },
      { field: 'dateFormat', header: 'DATE', sort: true, filter: true },
      {
        field: 'speculation',
        header: 'SEPECULATION',
        sort: true,
        filter: true,
      },

      { field: 'exigibleFormat', header: 'EXIGIBLE', sort: true, filter: true },
      {
        field: 'sumRemboursementsFormat',
        header: 'REMBOUR.',
        sort: true,
        filter: true,
      },
      {
        field: 'tauxRemboursement',
        header: 'TAUX',
        sort: true,
        filter: true,
      },
    ]

    this.primengConfig.setTranslation({
      dayNames: [
        'Dimanche',
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi',
      ],
      dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
      monthNames: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
      ],
      monthNamesShort: [
        'Jan',
        'Fév',
        'Mar',
        'Avr',
        'Mai',
        'Juin',
        'Juil',
        'Aoû',
        'Sep',
        'Oct',
        'Nov',
        'Déc',
      ],
      today: "Aujourd'hui",
      clear: 'Effacer',
      dateFormat: 'dd/mm/yy',
      firstDayOfWeek: 1,
    })

    this.refreshPage()
    //this.viderBien();
  }
  async refreshPage() {
    this.loading = true
    await this.initDispatch()
    // await this.initSubscriptions()
    this.initSubscriptionsProgress()
  }

  private async initDispatch(): Promise<void> {
    const myFilterOps: GetOpParamsDTO = {
      opId: [],
      formeJuridiqueId: [],
      localiteId: [],
      societeOpId: [],
      agenceOpId: [],
      pointId: [],
      page: 1,
      limit: 10000,
    }

    myFilterOps.societeOpId = this.appService.getLocalselectedSocieteId()
    // myFilterOps.societeAgenceOpId = this.appService.getLocalselectedSocieteId()
    myFilterOps.agenceOpId = this.appService.getLocalselectedAgenceId()

    this.appService.removeNullProperties(myFilterOps)

    this.store.dispatch(
      fromOps.getOpsWithFilters({
        filter: {
          ...myFilterOps,
        },
      }),
    )

    this.opsWithFilters$ = this.store.pipe(
      select(fromOps.selectOpsWithFiltersList),
    )

    const myFilterCreditsAgences: GetCreditAgenceParamsDTO = {
      societeId: [],
      agenceId: [],
      agenceOpId: [],
      varieteId: [],
      produitId: [],
      anneeId: [],
      saisonId: [],
      opId: [],
      page: 1,
      limit: 1000,
    }

    myFilterCreditsAgences.produitId = JSON.parse(
      localStorage.getItem('selectedProduitBruitIds') || '[]',
    )

    myFilterCreditsAgences.societeId?.push(
      parseInt(this.appService.getLocalselectedSocieteId()),
    )

    myFilterCreditsAgences.anneeId?.push(
      parseInt(this.appService.getLocalselectedAnneeId()),
    )
    myFilterCreditsAgences.saisonId?.push(
      parseInt(this.appService.getLocalselectedSaisonId()),
    )
    this.appService.removeNullProperties(myFilterCreditsAgences)

    this.store.dispatch(
      fromCreditsAgences.getCreditsAgencesWithFilters({
        filter: {
          ...myFilterCreditsAgences,
        },
      }),
    )
    this.creditsAgencesWithFilters$ = this.store.pipe(
      select(fromCreditsAgences.selectCreditsAgencesWithFiltersList),
    )

    this.store.dispatch(fromAgences.getAgences())
    this.store.dispatch(fromPointAgences.getPointAgences())
    this.store.dispatch(fromExploitations.getExploitations())
    this.store.dispatch(fromRemboursements.getRemboursements())
    this.store.dispatch(fromMouvementStockages.getMouvementStockages())

    const retourVariete = this.varietes.find(
      (item) =>
        item.id == parseInt(this.appService.getLocalselectedVarieteId()),
    )

    if (retourVariete) {
      this.store.dispatch(
        fromMouvementStockages.getAllMouvementStockagesProduitCampagne({
          produitId: retourVariete.produit?.id ?? 0,
          anneeId: this.appService.getLocalselectedCampagneAnneeId(),
          saisonId: this.appService.getLocalselectedCampagneSaisonId(),
        }),
      )
    }

    // Simulate async completion point (e.g., if store dispatch were observable)
    await Promise.resolve()
  }

  private async initSubscriptions(mySelectedIds: number[]): Promise<void> {
    const varietesFiltres: IVariete[] = this.varietes.filter(
      (variete) => variete.produit?.familleEmplacement?.id === 1,
    )

    // Utiliser un Set pour éliminer les doublons
    const produitsSet: Set<string> = new Set(
      varietesFiltres
        .map((paquet) => paquet.produit?.name)
        .filter((name): name is string => name !== undefined),
    )
    // Créer une liste distincte d'objets de produit
    const produitsDistincts: IProduit[] = Array.from(produitsSet)
      .map(
        (nomProduit) =>
          this.varietes.find(
            (paquet) => paquet.produit && paquet.produit.name === nomProduit,
          )?.produit,
      )
      .filter(Boolean) as IProduit[]

    let varietesInGroup: IVariete[] = []
    this.selectItemGroupVarietes = []
    // this.selectItemGroupVarietes.push(groupAucun)

    produitsDistincts.forEach((itemProduit) => {
      // Créer un objet pour représenter le groupe de produits
      const groupProduit: SelectItem = {
        label: itemProduit.name,
        value: itemProduit.id,
        items: [],
      }

      // Filtrer les varietes qui appartiennent à ce groupe
      varietesInGroup = varietesFiltres.filter(
        (variete) => variete.produit?.id === groupProduit.value,
      )

      varietesInGroup.forEach((maVariete) => {
        groupProduit.items.push({
          label: maVariete.name,
          value: maVariete,
        })
        // Ajouter le groupe de produits à la liste finale
      })
      this.selectItemGroupVarietes.push(groupProduit)

      // Ajouter un groupe pour "Aucun"
    })

    /////////////////////// BEGIN ///////////////////////////////
    console.time('Time this')

    this.opsWithFiltersSubscription = this.opsWithFilters$.subscribe(
      (datas: IOp[]) => {
        if (datas) {
          this.opsWithFilters = datas.map((device: IOp) => {
            return {
              ...device,
              compte: device.SocieteOp?.[0]?.compte,
              numRegistre: device.SocieteOp?.[0]?.numRegistre,
              ninea: device.SocieteOp?.[0]?.ninea,
              capital: '',
              interet: '',
              moratoire: '',
              autres_engagements: '',
              exigible: '',
            }
          })

          this.originalOpsWithFiltersData = this.opsWithFilters.map((row) => ({
            ...row,
          }))

          this.opsAddRowsWithFilters = this.opsWithFilters.map((item) => ({
            ...item,
            localite: item.localite?.name,
            formeJuridique: item.formeJuridique?.name,
            capital: '',
            interet: '',
            moratoire: '',
            autres_engagements: '',
            exigible: '',
          }))
        }
      },
    )

    // mySelectedProduitBruitIds: number[]

    this.creditsAgencesWithFiltersSubscription =
      this.creditsAgencesWithFilters$.subscribe((credits: ICreditAgence[]) => {
        if (credits) {
          // console.log(' ✅ ✅ ✅ ✅ ✅ ✅  credits before', credits)

          if (mySelectedIds.length > 0) {
            credits = credits.filter(
              (item: ICreditAgence) =>
                item.variete && mySelectedIds.includes(item.variete.produitId),
            )
          }

          // console.log(' ✅ ✅ ✅ ✅ ✅ ✅  credits after', credits)
          this.creditsAgencesWithFilters = credits.map((device: any) => {
            const dateObjectCredit = new Date(device.date)
            const formattedDate = dateObjectCredit.toLocaleDateString('fr-FR')
            const totalValeur = device.RemboursementAgence.reduce(
              (sum: number, item: IRemboursementAgence) => sum + item.valeur,
              0,
            )

            const exigible =
              device.capital +
              device.interet +
              device.moratoire +
              device.autres_engagements

            const tauxRemboursement = totalValeur / exigible
            return {
              ...device,
              dateFormat: formattedDate,
              compte: device.op?.SocieteOp.filter(
                (item: ISocieteOp) =>
                  item.societeId ===
                  parseInt(this.appService.getLocalselectedSocieteId()),
              )[0].compte,
              formeJuridique: device.op?.formeJuridique.name,
              localite: device.agenceOp.op.localite.name,
              variete: device.variete.name,
              produit: device.variete.produit.name,
              filiere: device.variete.produit.filiere.name,
              speculation:
                // device.variete.produit.filiere.name + ' | ' +
                device.variete.produit.name + ' | ' + device.variete.name,
              capitalFormat: this.formatMontant(device.capital),
              interetFormat: this.formatMontant(device.interet),
              moratoireFormat: this.formatMontant(device.moratoire),
              autres_engagementsFormat: this.formatMontant(
                device.autres_engagements,
              ),
              sumRemboursementsFormat: this.formatMontant(totalValeur),
              tauxRemboursement: tauxRemboursement * 100,
              exigibleFormat: this.formatMontant(exigible),
              nameOp: device.op?.name,
            }
          })
          // console.log(' ✅ ✅ ✅  credits: ', credits)
          // console.log(' ✅ ✅ ✅  this.creditsAgencesWithFilters: ',this.creditsAgencesWithFilters,)
        }
      })

    this.pointsCollectesFromSocieteSubscription =
      this.pointsCollectesFromSociete$.subscribe(
        (points: IPointAgence[]) => {
          if (points) {
            this.pointsCollectesFromSociete = points.map(
              (device: IPointAgence) => {
                return { ...device }
              },
            )

            this.selectedAgences.forEach((agence) => {
              this.pointsCollectesFromAgence =
                this.pointsCollectesFromSociete.filter(
                  (myPoint) => myPoint.agence?.id === agence.id,
                )
              // console.log('✅ ✅ ✅  ✅ ✅ ✅ this.pointsCollectesFromAgence',this.pointsCollectesFromAgence,)
              this.pointsCollectesFromAgence.forEach((pointFromAgence) => {
                /*
                console.log(
                  ' ✅ ✅ ✅  ✅ ✅ ✅ point ' +
                    pointFromAgence.point.id +
                    ' - ',
                  pointFromAgence,
                )
                  */
                const creditsAgenceOnPoint =
                  this.creditsAgencesWithFilters.filter((credit) => {
                    return (
                      credit.agenceOp?.point?.id === pointFromAgence.point?.id
                    )
                  })

                this.creditGroups[pointFromAgence.pointId] =
                  creditsAgenceOnPoint

                const mySumCapitals = creditsAgenceOnPoint.reduce(
                  (sum, credit) => sum + credit.capital,
                  0,
                )

                const mySumMoratoires = creditsAgenceOnPoint.reduce(
                  (sum, credit) => sum + credit.moratoire,
                  0,
                )

                const mySumInterets = creditsAgenceOnPoint.reduce(
                  (sum, credit) => sum + credit.interet,
                  0,
                )

                const mySumAutresEngagements = creditsAgenceOnPoint.reduce(
                  (sum, credit) => sum + credit.autres_engagements,
                  0,
                )

                const mySumExigibles =
                  mySumCapitals +
                  mySumMoratoires +
                  mySumInterets +
                  mySumAutresEngagements

                const mySumRemboursements =
                  this.calculerTotalRemboursement(creditsAgenceOnPoint)

                const mySumTauxRemboursements =
                  (mySumRemboursements / mySumExigibles) * 100 || 0

                const mySumCredit: ISumCreditAgence = {
                  id: pointFromAgence.id,
                  sumCapitals: mySumCapitals,
                  sumCapitalsFormatString:
                    mySumCapitals
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
                  sumMoratoires: mySumMoratoires,
                  sumMoratoiresFormatString:
                    mySumMoratoires
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
                  sumInterets: mySumInterets,
                  sumInteretsFormatString:
                    mySumInterets
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
                  sumAutresEngagements: mySumAutresEngagements,
                  sumAutresEngagementsFormatString:
                    mySumAutresEngagements
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
                  sumExigibles: mySumExigibles,
                  sumExigiblesFormatString:
                    mySumExigibles
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
                  sumRemboursements: mySumRemboursements,
                  sumRemboursementsFormatString:
                    mySumRemboursements
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
                  sumTauxRemboursement: mySumTauxRemboursements,
                  sumtauxRemboursementFormatString:
                    mySumTauxRemboursements.toFixed(2) + ' %',
                }
                /*
                console.log(
                  ' ✅ ✅ ✅  ✅ ✅ ✅ mySumCredit ' +
                    pointFromAgence.point.id +
                    ' - ',
                  mySumCredit,
                )
                */
                this.creditSumGroups[pointFromAgence.pointId] = mySumCredit

                /*********** DEBUT POUR AGENCE */
                const creditsOnAgence = this.creditsAgencesWithFilters.filter(
                  (credit) => {
                    return credit.agenceId === agence.id
                  },
                )
                this.creditGroupsAgence[agence.id] = creditsOnAgence

                const mySumAgenceCapitals = creditsOnAgence.reduce(
                  (sum, credit) => sum + credit.capital,
                  0,
                )
                const mySumAgenceMoratoires = creditsOnAgence.reduce(
                  (sum, credit) => sum + credit.moratoire,
                  0,
                )
                const mySumAgenceInterets = creditsOnAgence.reduce(
                  (sum, credit) => sum + credit.interet,
                  0,
                )
                const mySumAgenceAutresEngagements = creditsOnAgence.reduce(
                  (sum, credit) => sum + credit.autres_engagements,
                  0,
                )
                const mySumAgenceExigibles =
                  mySumAgenceCapitals +
                  mySumAgenceMoratoires +
                  mySumAgenceInterets +
                  mySumAgenceAutresEngagements

                const mySumAgenceRemboursements =
                  this.calculerTotalRemboursement(creditsOnAgence)

                const mySumAgenceTauxRemboursements =
                  (mySumAgenceRemboursements / mySumAgenceExigibles) * 100 || 0

                const mySumAgenceCredit: ISumCreditAgence = {
                  id: agence.id,
                  sumCapitals: mySumAgenceCapitals,
                  sumCapitalsFormatString:
                    mySumAgenceCapitals
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
                  sumMoratoires: mySumAgenceMoratoires,
                  sumMoratoiresFormatString:
                    mySumAgenceMoratoires
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
                  sumInterets: mySumAgenceInterets,
                  sumInteretsFormatString:
                    mySumAgenceInterets
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
                  sumAutresEngagements: mySumAgenceAutresEngagements,
                  sumAutresEngagementsFormatString:
                    mySumAgenceAutresEngagements
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
                  sumExigibles: mySumAgenceExigibles,
                  sumExigiblesFormatString:
                    mySumAgenceExigibles
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
                  sumRemboursements: mySumAgenceRemboursements,
                  sumRemboursementsFormatString:
                    mySumAgenceRemboursements
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
                  sumTauxRemboursement: mySumAgenceTauxRemboursements,
                  sumtauxRemboursementFormatString:
                    mySumAgenceTauxRemboursements.toFixed(2) + ' %',
                }

                this.creditSumGroupsAgence[agence.id] = mySumAgenceCredit
              })
            })

            let mySumCreditSelectedIds = Object.values(
              this.creditSumGroupsAgence,
            )
            if (this.selectedAgenceIds.length > 0) {
              mySumCreditSelectedIds = Object.values(
                this.creditSumGroupsAgence,
              ).filter((item) => this.selectedAgenceIds.includes(item.id))
            }

            const mySumTotalCapitals = mySumCreditSelectedIds.reduce(
              (total, item) => total + (item.sumCapitals || 0),
              0,
            )

            const mySumTotalMoratoires = mySumCreditSelectedIds.reduce(
              (total, item) => total + (item.sumMoratoires || 0),
              0,
            )

            const mySumTotalInterets = mySumCreditSelectedIds.reduce(
              (total, item) => total + (item.sumInterets || 0),
              0,
            )

            const mySumTotalAutresEngagements = mySumCreditSelectedIds.reduce(
              (total, item) => total + (item.sumAutresEngagements || 0),
              0,
            )

            const mySumTotalExigibles = mySumCreditSelectedIds.reduce(
              (total, item) => total + (item.sumExigibles || 0),
              0,
            )

            const mySumTotalRemboursements = mySumCreditSelectedIds.reduce(
              (total, item) => total + (item.sumRemboursements || 0),
              0,
            )

            const mySumTotalTauxRemboursement =
              (mySumTotalRemboursements / mySumTotalExigibles) * 100 || 0

            const mySumTotalCredit: ISumCreditAgence = {
              id: 0,
              sumCapitals: mySumTotalCapitals,
              sumCapitalsFormatString:
                mySumTotalCapitals
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
              sumMoratoires: mySumTotalMoratoires,
              sumMoratoiresFormatString:
                mySumTotalMoratoires
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
              sumInterets: mySumTotalInterets,
              sumInteretsFormatString:
                mySumTotalInterets
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
              sumAutresEngagements: mySumTotalAutresEngagements,
              sumAutresEngagementsFormatString:
                mySumTotalAutresEngagements
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
              sumExigibles: mySumTotalExigibles,
              sumExigiblesFormatString:
                mySumTotalExigibles
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
              sumRemboursements: mySumTotalRemboursements,
              sumRemboursementsFormatString:
                mySumTotalRemboursements
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
              sumTauxRemboursement: mySumTotalTauxRemboursement,
              sumtauxRemboursementFormatString:
                mySumTotalTauxRemboursement.toFixed(2) + ' %',
            }

            this.loginService.titreSocieteSumExigibles =
              mySumTotalCredit.sumExigiblesFormatString

            this.loginService.titreSocieteSumCapital =
              mySumTotalCredit.sumCapitalsFormatString

            this.loginService.titreSocieteSumMoratoire =
              mySumTotalCredit.sumMoratoiresFormatString

            this.loginService.titreSocieteSumInteret =
              mySumTotalCredit.sumInteretsFormatString

            this.loginService.titreSocieteSumAutresEngagements =
              mySumTotalCredit.sumAutresEngagementsFormatString

            this.loginService.titreSocieteSumRemboursements =
              mySumTotalCredit.sumRemboursementsFormatString

            this.loginService.titreSocieteSumTauxRemboursementFormat =
              mySumTotalCredit.sumtauxRemboursementFormatString

            this.loginService.titreSocieteSumTauxRemboursement =
              mySumTotalCredit.sumTauxRemboursement
          }

          setTimeout(() => {
            this.loading = false
          }, 1500)
        },
        (error) => {
          console.error(
            ' ❌ ❌ ❌ Error fetching points collectes from agence:',
            error,
          )
        },
      )

    // Simulate async completion point (e.g., if store dispatch were observable)
    await Promise.resolve()
    console.timeEnd('Time this')
    /////////////////////// END /////////////////////////////////
  }

  async executeCustomInitSubscriptions(): Promise<void> {
    // Custom code to execute during each progress update
    return new Promise((resolve) => {
      console.log('Executing custom code...')
      // Simulate a delay for custom code execution
      this.initSubscriptions(this.selectedProduitBruitIds)
      setTimeout(() => {
        resolve()
      }, 500) // Simulate custom code execution time
    })
  }

  async initSubscriptionsProgress() {
    while (this.progress < 100) {
      this.progress += 10
      await this.executeCustomInitSubscriptions()
      await this.delay(1000) // Wait for 1 second before next update
    }
  }
  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  viderBien() {
    this.initSubscriptions(this.selectedProduitBruitIds)
    //this.isPersonneOrSociete();
  }

  formatMontant(montant: number) {
    return montant.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA'
  }
  isNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value)
  }

  calculerTotalRemboursement(credits: ICreditAgence[]): number {
    return credits.reduce((total, credit) => {
      const totalRemboursements = credit.RemboursementAgence?.reduce(
        (somme, remboursement) => somme + remboursement.valeur,
        0,
      )
      return total + (totalRemboursements ?? 0)
    }, 0)
  }

  CountRecords(myTabClients: Table, RowsWithFilters: unknown[]): number {
    const data = myTabClients.filteredValue ?? RowsWithFilters

    return data.length
  }

  totalRows(myTable: any): number {
    return myTable?.length || 0
  }

  filteredRows(myTableFiltre: Table, myTable: unknown[]): number {
    return myTableFiltre.filteredValue?.length ?? this.totalRows(myTable)
  }

  getTotalExigibles(myTabClients: Table): number {
    if (myTabClients.filteredValue) {
      //return myTabClients.filteredValue.length;
      return (
        myTabClients.filteredValue
          ?.map((item: { exigible: number }) => item.exigible)
          ?.reduce((a: number, b: number) => a + b, 0) || 0
      )
    } else {
      return (
        myTabClients.value
          ?.map((item: { exigible: number }) => item.exigible)
          ?.reduce((a: number, b: number) => a + b, 0) || 0
      )
    }
  }
  getTotalRemboursements(myTabClients: Table): number {
    if (myTabClients.filteredValue) {
      //return myTabClients.filteredValue.length;
      return (
        myTabClients.filteredValue
          ?.map((item: { remboursementsSum: number }) => item.remboursementsSum)
          ?.reduce((a: number, b: number) => a + b, 0) || 0
      )
    } else {
      return (
        myTabClients.value
          ?.map((item: { remboursementsSum: number }) => item.remboursementsSum)
          ?.reduce((a: number, b: number) => a + b, 0) || 0
      )
    }
  }

  getTauxRemboursements(myTabClients: Table): number {
    let taux = 0
    if (this.getTotalExigibles(myTabClients) !== 0) {
      taux =
        (this.getTotalRemboursements(myTabClients) /
          this.getTotalExigibles(myTabClients)) *
        100
    }
    return taux
  }
  formatDate(date: Date) {
    const dateObject = new Date(date)
    const formattedDate = dateObject.toLocaleDateString('fr-FR')
    return formattedDate
  }

  allerSuivant() {
    this.dialogPageIndex = this.dialogPageIndex + 1
  }
  allerAvant() {
    this.dialogPageIndex = this.dialogPageIndex - 1
  }

  estFormulaireValide() {
    return null
  }

  showDialogRemboursements() {
    return null
  }

  showDialogExploitationS() {
    return null
  }

  showDialogCredit() {
    return null
  }
  clear(table: Table) {
    table.clear()
  }

  async onAnneeChange(event: { value: IAnnee }) {
    this.selectedAnnee = event.value
    console.log('event.value: ' + event.value.id)
    localStorage.setItem('selectedAnneeId', event.value.id.toString())
    localStorage.setItem('selectedAnneeName', event.value.name.toString())
    this.selectedAnneeId = event.value.id
    this.loginService.mySelectedAnnee = event.value

    this.loading = true
    this.onReloadCreditAgence()
  }

  async onAnneeChangeDialog(event: { value: IAnnee }) {
    this.selectedAnnee = event.value
    console.log('event.value: ' + event.value.id)
    localStorage.setItem('selectedAnneeId', event.value.id.toString())
    localStorage.setItem('selectedAnneeName', event.value.name.toString())
    this.selectedAnneeId = event.value.id
    this.loginService.mySelectedAnnee = event.value
  }

  onSaisonChange(event: { value: ISaison }) {
    this.selectedSaison = event.value
    console.log('event.value: ' + event.value)
    localStorage.setItem('selectedSaisonId', event.value.id.toString())
    localStorage.setItem('selectedSaisonName', event.value.name.toString())
    this.selectedSaisonId = event.value.id
    this.loginService.mySelectedSaison = event.value

    this.loading = true
    this.onReloadCreditAgence()
  }
  onSaisonChangeDialog(event: { value: ISaison }) {
    this.selectedSaison = event.value
    console.log('event.value: ' + event.value)
    localStorage.setItem('selectedSaisonId', event.value.id.toString())
    localStorage.setItem('selectedSaisonName', event.value.name.toString())
    this.selectedSaisonId = event.value.id
    this.loginService.mySelectedSaison = event.value
  }
  onAgencesChange() {
    if (this.selectedAgenceIds.length === 0) {
      this.selectedAgences = this.agences
    } else {
      this.selectedAgences = this.agences.filter((a) =>
        this.selectedAgenceIds.includes(a.id),
      )
    }
    this.initSubscriptions(this.selectedProduitBruitIds)
    //this.initDispatch()
  }

  onAgencesClear() {
    console.log('Aucune agence sélectionnée')
    // this.selectedAgenceIds = []
    // this.selectedAgences = []
    // this.initDispatch()
    this.initSubscriptions(this.selectedProduitBruitIds)
  }
  onSelectGroupVarieteChange(event: { value: IVariete }) {
    this.selectedVarieteDialog = event.value
    console.log('⭐ ⭐ ⭐ selectedDate: ' + this.selectedDate)
    console.log(
      '⭐ ⭐ ⭐ this.selectedVarieteDialog ' + this.selectedVarieteDialog,
    )
    if (event.value && this.selectedDate !== null) {
      this.activeAddCredit = true
    }
  }
  onSelectDateChange(event: { value: Date }) {
    this.selectedDate = event.value
    console.log('⭐ ⭐ ⭐ selectedDate: ' + this.selectedDate)
    console.log(
      '⭐ ⭐ ⭐ this.selectedVarieteDialog ' + this.selectedVarieteDialog,
    )
    if (event.value && this.selectedVarieteDialog !== null) {
      this.activeAddCredit = true
    }
  }
  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Mise à jour des produits sélectionnés
   *
   * - Stocke dans le local storage les Ids des produits sélectionnés
   * - Met à jour l'ensemble des crédits pour les afficher/masquer en fonction des filtres
   * - Appelle la méthode {@link onReloadCreditAgence} pour recharger les données
   */
  /*******  2a28076f-2b50-43d3-858e-6c9d37ad3348  *******/
  onProduitsChange() {
    // console.log(' ✅ ✅ ✅  ✅ ✅ ✅  Produits(selectionnées) :',this.selectedProduitBruitIds,)

    localStorage.setItem(
      'selectedProduitBruitIds',
      JSON.stringify(this.selectedProduitBruitIds),
    )
    this.initSubscriptions(this.selectedProduitBruitIds)
  }

  onProduitsClear() {
    console.log('Aucun produit selectionnée')
    // this.selectedProduitBruitIds = []
    // this.selectedProduitBruits = []
    this.initSubscriptions(this.selectedProduitBruitIds)
  }

  filteredPoints(id: number) {
    return (
      this.pointsCollectesFromSociete.filter((p) => p.agenceId === id) || []
    )
  }

  onReloadCreditAgence(): void {
    this.navigationService.reloadRoute(
      '/credit-agence',
      () => {
        console.log('⏳ Affichage du loader...')
        this.loading = true
      },
      () => {
        console.log('✅ Rechargement terminé.')
        this.loading = false
      },
      {},
      1500, // délai minimum en millisecondes
    )
  }
  showDialogAddCredit() {
    this.displayAddCredit = true
  }
  onDialogHideAddCredit() {
    this.displayAddCredit = false
  }

  confirmValidation(): void {
    this.confirmationService.confirm({
      message: 'Voulez-vous enregistrer ces crédits ?',
      header: 'Confirmation',
      icon: 'pi pi-question-circle',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => this.onDialogValidateAddCredit(), //this.onDialogValidateAddCredit(),
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Annulé',
          detail: 'Enregistrement annulé.',
          life: 2000,
        })
      },
    })
  }

  onValueChange(): void {
    // Déclenche l'animation
    this.animateCell = true
    // Réinitialise la variable après 1 seconde (durée de l'animation)
    setTimeout(() => {
      this.animateCell = false
    }, 1000)
    // Ici, tu peux également effectuer d'autres traitements si nécessaire
  }
  onDialogValidateAddCredit() {
    this.editedOpsWithFiltersRows = []

    this.opsAddRowsWithFilters.forEach((row, index) => {
      const original = this.originalOpsWithFiltersData[index]
      if (
        (row.capital !== original.capital && row.capital > 0) ||
        (row.interet !== original.interet && row.interet > 0) ||
        (row.moratoire !== original.moratoire && row.moratoire > 0) ||
        (row.autres_engagements !== original.autres_engagements &&
          row.autres_engagements > 0)
      ) {
        this.editedOpsWithFiltersRows.push(row)
      }
    })
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail:
        this.editedOpsWithFiltersRows.length + ' Crédit(s) enregistré(s).',
      life: 3000,
    })
    this.displayAddCredit = false
    this.afficherDate()
    console.log(
      ' ✅ ✅ ✅  ✅ ✅ ✅  Agence: ',
      this.appService.getLocalselectedAgenceId(),
    )
    console.log(
      ' ✅ ✅ ✅  ✅ ✅ ✅ this.editedOpsWithFiltersRows: ',
      this.editedOpsWithFiltersRows,
    )
    console.log(
      ' ⭐ ⭐ ⭐  ✨ ✨ ✨ this.campagne: ',
      this.selectedAnnee?.id + ' - ' + this.selectedSaison?.name,
    )
    //return this.editedOpsWithFiltersRows
    if (this.editedOpsWithFiltersRows.length) {
      this.loading = true

      this.editedOpsWithFiltersRows.forEach((credit) => {
        const myAgenceOp = credit.AgenceOp.filter(
          (item: IAgenceOp) =>
            item.agenceId ===
            parseInt(this.appService.getLocalselectedAgenceId()),
        )[0]

        const myCreditAgence: ICreditAgence = {
          id: 0,
          date: this.selectedDate ?? new Date(),
          capital: parseFloat(credit.capital) || 0,
          interet: parseFloat(credit.interet) || 0,
          moratoire: parseFloat(credit.moratoire) || 0,
          autres_engagements: parseFloat(credit.autres_engagements) || 0,
          varieteId: this.selectedVarieteDialog?.id,
          anneeId: this.selectedAnnee?.id,
          saisonId: this.selectedSaison?.id,
          agenceOpId: myAgenceOp.id,
          agenceId: parseInt(this.appService.getLocalselectedAgenceId()),
          opId: myAgenceOp.opId,
        }

        this.store.dispatch(
          fromCreditsAgences.createCreditAgence({ body: myCreditAgence }),
        )
      })

      this.onReloadCreditAgence()
    } else {
      this.onDialogHideAddCredit()
    }
  }

  afficherDate() {
    if (this.selectedDate) {
      const jour = this.selectedDate.getDate().toString().padStart(2, '0')
      const mois = (this.selectedDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')
      const annee = this.selectedDate.getFullYear()
      this.dateAffichee = `${jour}/${mois}/${annee}`
    } else {
      this.dateAffichee = 'Aucune date sélectionnée'
    }
    console.log('✅ ✅ ✅  ✅ ✅ ✅ this.dateAffichee: ', this.dateAffichee)
  }

  sanitizeAmount(value: string | number): number {
    if (typeof value === 'string') {
      // Nettoyer FCFA, espaces, virgules
      value = value.replace(/[^\d.-]/g, '').replace(',', '.')
    }
    return parseFloat(value as string) || 0
  }

  getExigible(rowData: {
    capital: string | number
    interet: string | number
    moratoire: string | number
    autres_engagements: string | number
  }): number {
    return (
      this.sanitizeAmount(rowData.capital) +
      this.sanitizeAmount(rowData.interet) +
      this.sanitizeAmount(rowData.moratoire) +
      this.sanitizeAmount(rowData.autres_engagements)
    )
  }

  getTotal(field: string): number {
    return this.opsAddRowsWithFilters.reduce((acc, row) => {
      if (field === 'exigible') {
        return (
          acc +
          this.sanitizeAmount(row.capital) +
          this.sanitizeAmount(row.interet) +
          this.sanitizeAmount(row.moratoire) +
          this.sanitizeAmount(row.autres_engagements)
        )
      } else {
        return acc + this.sanitizeAmount(row[field])
      }
    }, 0)
  }
  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.charCode
    // Autoriser seulement chiffres, point et backspace
    if (
      charCode !== 0 && // Pour les touches spéciales (arrow, etc.)
      charCode !== 46 && // Point
      (charCode < 48 || charCode > 57)
    ) {
      event.preventDefault()
    }
  }
}

import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import {
  ConfirmationService,
  MenuItem,
  Message,
  MessageService,
  SharedModule,
} from 'primeng/api'
import { Observable, Subscription } from 'rxjs'
import { select, Store } from '@ngrx/store'
import * as fromOps from '../../../store/op'
import * as fromAgences from '../../../store/agence'
import * as fromPointAgences from '../../../store/point_agence'
import moment from 'moment'

import { Table, TableModule } from 'primeng/table'

import { Router } from '@angular/router'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { ProgressBarModule } from 'primeng/progressbar'

import { DropdownModule } from 'primeng/dropdown'
import { DialogModule } from 'primeng/dialog'
import { CommonModule, NgIf } from '@angular/common'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { ToolbarModule } from 'primeng/toolbar'
import { ToastModule } from 'primeng/toast'

import { OpService } from '../../../services/op.service'
import { AppService } from '../../../services/app.service'

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MultiSelectModule } from 'primeng/multiselect'
import { SelectButtonModule } from 'primeng/selectbutton'
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table'

import { LoginService } from '../../../services/login.service'

import {
  CreateOpPortefeuilleDto,
  IAgence,
  IFormeJuridique,
  ILocalite,
  IOp,
  IPoint,
  IPointAgence,
  ITypeSociete,
} from '@shared-models'
import { StepsModule } from 'primeng/steps'
import { MessagesModule } from 'primeng/messages'
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete'
import { CalendarModule } from 'primeng/calendar'
import { NavigationService } from '../../../services/navigation.service'

@Component({
  selector: 'app-op',
  templateUrl: './op.component.html',
  styleUrls: ['./op.component.css'],
  standalone: true,
  imports: [
    ProgressSpinnerModule,
    ProgressBarModule,
    ToastModule,
    ToolbarModule,
    SharedModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    NgIf,
    DialogModule,
    DropdownModule,
    MultiSelectModule,
    InputTextareaModule,
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    SelectButtonModule,
    StepsModule,
    MessagesModule,
    AutoCompleteModule,
    CommonModule,
    CalendarModule,
  ],
})
export class OpComponent implements OnInit {
  cols: { field: string; header?: string; sort?: boolean; filter?: boolean }[] =
    []
  @ViewChild('dt') dt!: Table
  @ViewChild('mapElement') mapElement!: ElementRef

  submitted = false
  titleHeader = 'New Op'
  opDialogDisplay = false
  opForm!: FormGroup
  isEditMode = false
  IlocaliteId: ILocalite | undefined

  PageNames = PageNames
  dialogPageIndex = PageNames.DebutPage
  @Input() opId?: number
  @Output() saved = new EventEmitter<void>()
  msgs: Message[] = []

  dialogPages: MenuItem[] = [{ label: 'Infos OP ...' }, { label: 'Autres ...' }]
  calendarIcon = 'pi pi-calendar'
  selectedDate: Date | null = null
  dateAffichee: string | null = null

  titleOpDialogCredit = ''

  labelSave = 'Save'
  classSave = 'p-button-text; p-button-success'
  actionSave = 'add'

  opsWithFilters$!: Observable<IOp[]>
  private opsWithFiltersSubscription: Subscription | undefined
  opsWithFilters: IOp[] = []
  op: IOp = {} as IOp
  selectedopsWithFilters: IOp[] | undefined

  ops$: Observable<IOp[]> | undefined
  ops: IOp[] = []
  selectedOps: IOp[] | undefined

  agences$!: Observable<IAgence[]> | undefined
  agences: IAgence[] = []
  selectedAgences!: number[]

  pointsCollectesFromAgence$!: Observable<IPointAgence[]>
  private pointsCollectesFromAgenceSubscription: Subscription | undefined
  pointsCollectesFromAgence: IPointAgence[] = []
  pointFromAgence: IPointAgence | undefined = undefined
  selectedpointsCollectesFromAgence: IPointAgence[] | undefined

  myPointsOnAgence: IPoint[] = []
  filteredPoints: IPoint[] = []

  localites: ILocalite[] = []
  selectedLocalite: ILocalite | undefined

  formeJuridiques: IFormeJuridique[] = []
  selectedFormeJuridique: IFormeJuridique | undefined

  idsAgences!: number[]

  isPersonne = false
  isSociete = false

  typeSocietes$!: Observable<ITypeSociete[]>
  typeSocietes: ITypeSociete[] = []

  isLoading$: Observable<boolean> | undefined
  isLoadingOps$: Observable<boolean> | undefined

  disableAdd = false
  loading = false

  selectedLocaliteAutocomplete: ILocalite | null = null
  filteredLocaliteAutocompletes:
    | { label: string; items: ILocalite[] }[]
    | undefined

  // Valeur par défaut pour le select
  selectedValue = 1

  selectedPortefeuille = 1

  // Liste des options à afficher
  portefeuilles = [
    { value: 1, label: 'Tous' },
    { value: 2, label: 'Oui' },
    { value: 3, label: 'Non' },
  ]

  expandedRows: { [key: string]: boolean } = {}
  globalFilter = ''
  progress = 50

  constructor(
    //private router: Router,
    @Inject(Router) private router: Router,
    private readonly store: Store,

    private opService: OpService,
    public loginService: LoginService,
    public appService: AppService,
    private messageService: MessageService,
    private navigationService: NavigationService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
  ) {
    this.localites = this.loginService.allLocalites.map((device: ILocalite) => {
      return { ...device }
    })

    this.formeJuridiques = this.loginService.allFormeJuridiques.map(
      (device: IFormeJuridique) => {
        return { ...device }
      },
    )

    this.agences$ = this.store.pipe(select(fromAgences.selectAgencesList))
    this.agences$.subscribe((data: IAgence[]) => {
      this.agences = data.map((device: IAgence) => {
        return { ...device }
      })

      this.agences = this.agences.filter(
        (agence) =>
          agence.societeId ===
          parseInt(this.appService.getLocalselectedSocieteId()), // this.appService.getLocalselectedSocieteId(),
      )

      this.idsAgences = this.agences.map((agence) => agence.id)
      // this.selectedAgences = this.agences.map((agence) => agence.id)
    })
    this.idsAgences = this.agences.map((agence) => agence.id)
  }

  ngBeforeViewInit() {
    this.op = {
      id: 0,
      name: '',
      sigle: '',
      email: '',
      telephone: '',
      adresse: '',
      latitude: 0,
      longitude: 0,
      prenomContact: '',
      nomContact: '',
      emailContact: '',
      telephoneContact: '',
      isActive: true,
      formeJuridiqueId: 0,
      localiteId: 0,
      pointId: 0,
    }
  }
  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'ID', sort: false, filter: false },
      {
        field: 'formeJuridiqueName',
        header: 'F.J',
        sort: true,
        filter: true,
      },
      {
        field: 'name',
        header: 'NOM',
        sort: true,
        filter: true,
      },
      { field: 'localiteName', header: 'LOCALITE', sort: true, filter: true },

      {
        field: 'compte',
        header: 'COMPTE',
        sort: true,
        filter: true,
      },
      {
        field: 'ninea', // Utilisation du champ transformé
        header: 'NINEA',
        sort: true,
        filter: true,
      },
      {
        field: 'numRegistre', // Utilisation du champ transformé
        header: 'REGISTRE',
        sort: true,
        filter: true,
      },
      { field: 'havePortefeuille' },
      { field: 'havePortefeuilleOnSociete' },
      { field: 'havePortefeuilleOnAgence' },
      { field: 'havePortefeuilleOnAgences' },
      //{ field: 'pointName', header: 'P.C', sort: true, filter: true },
    ]

    this.opForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      sigle: this.fb.control('', []),
      email: this.fb.control('', [Validators.required, Validators.email]),
      telephone: this.fb.control('', [Validators.required]),
      adresse: this.fb.control('', []),
      latitude: this.fb.control(0),
      longitude: this.fb.control(0),
      prenomContact: this.fb.control('', []),
      nomContact: this.fb.control('', []),
      emailContact: this.fb.control('', []),
      telephoneContact: this.fb.control('', []),
      isActive: this.fb.control(true),
      formeJuridiqueId: this.fb.control(null, [Validators.required]),
      localiteId: this.fb.control(null, [Validators.required]),
      pointId: this.fb.control(null),
      isPorteFeuille: this.fb.control(false),
      compte: this.fb.control({ value: '', disabled: true }, []),
      numRegistre: this.fb.control({ value: '', disabled: true }, []),
      ninea: this.fb.control({ value: '', disabled: true }, []),
      datePorteFeuille: this.fb.control({ value: '', disabled: true }, []),
      pointCollecteId: this.fb.control({ value: '', disabled: true }, [
        Validators.required,
      ]),
    })
    this.setupIsPorteFeuilleListener()

    if (this.opId) {
      this.isEditMode = true
      this.opService
        .getById(this.opId)
        .subscribe((op) => this.opForm.patchValue(op))
    }

    // this.initDispatch()

    //this.viderOp()
    this.refreshPage()
  }

  onCreateOp(op: IOp): void {
    this.store.dispatch(fromOps.createOp({ op }))
  }

  onUpdateOp(op: IOp): void {
    this.store.dispatch(fromOps.updateOp({ op }))
  }

  onDeleteOp(op: IOp): void {
    this.store.dispatch(fromOps.deleteOp({ op }))
  }

  onGetOp(id: number, listOps: IOp[]): IOp | undefined {
    const _Op = listOps.find((item) => item.id === id)

    return _Op
  }

  allerSuivant() {
    this.dialogPageIndex = this.dialogPageIndex + 1
  }
  allerAvant() {
    this.dialogPageIndex = this.dialogPageIndex - 1
  }

  estFormulaireValide() {
    return this.opForm.valid
  }

  expandAll() {
    this.expandedRows = this.opsWithFilters.reduce(
      (acc: { [key: number]: boolean }, p) => {
        acc[p.id] = true
        return acc
      },
      {},
    )
  }

  onRowExpand(event: TableRowExpandEvent) {
    this.expandedRows[event.data.id] = true
    this.messageService.add({
      severity: 'info',
      summary: 'Op Expanded',
      detail: event.data.name,
      life: 3000,
    })
  }

  onRowCollapse(event: TableRowCollapseEvent) {
    delete this.expandedRows[event.data.id]
    this.messageService.add({
      severity: 'success',
      summary: 'Op Collapsed',
      detail: event.data.name,
      life: 3000,
    })
  }

  collapseAll() {
    this.expandedRows = {}
  }

  // Méthode pour gérer l'événement onChange
  onPortefeuilleChange(event: { value: number }) {
    this.selectedPortefeuille = event.value // Assurez-vous que `event.value` est bien un nombre
    console.log('Valeur sélectionnée :', this.selectedPortefeuille)
    this.onAgencesClear()
    this.initDispatch()
  }
  onAgencesChange() {
    console.log('Agences sélectionnées :', this.selectedAgences)
    this.selectedAgences.forEach((selected) => {
      console.log('selected.id', selected)
    })
    this.initDispatch()
  }

  onAgencesClear() {
    console.log('Aucune agence sélectionnée')
    this.selectedAgences = []
    this.initDispatch()
  }

  filterLocalite(event: AutoCompleteCompleteEvent) {
    const query = event.query?.toLowerCase() || ''

    if (!query) {
      // Si aucun texte, afficher tout groupé
      this.filteredLocaliteAutocompletes = this.groupLocalites(this.localites)
      return
    }

    const filtered = this.localites.filter((localite) => {
      const localiteName = localite.name.toLowerCase()
      const departementName = localite.departement?.name?.toLowerCase() || ''
      return localiteName.includes(query) || departementName.includes(query)
    })

    const grouped = this.groupLocalites(filtered)

    this.filteredLocaliteAutocompletes = grouped

    // Auto-sélection si un seul résultat
    const totalItems = grouped.reduce(
      (sum, group) => sum + group.items.length,
      0,
    )

    if (totalItems === 1) {
      const uniqueLocalite = grouped[0].items[0]
      this.opForm.get('localiteId')?.setValue(uniqueLocalite)
      this.onSelectLocalite(uniqueLocalite)
    }
  }
  private groupLocalites(
    localites: ILocalite[],
  ): { label: string; items: ILocalite[] }[] {
    const grouped: { [departementName: string]: ILocalite[] } = {}

    for (const loc of localites) {
      const departementName = loc.departement?.name || 'Inconnu'
      if (!grouped[departementName]) {
        grouped[departementName] = []
      }
      grouped[departementName].push(loc)
    }

    // On trie les départements par ordre alphabétique
    const sortedGroups = Object.keys(grouped)
      .sort()
      .map((departementName) => ({
        label: departementName,
        items: grouped[departementName].sort((a, b) =>
          a.name.localeCompare(b.name),
        ), // Trie localités aussi
      }))

    return sortedGroups
  }

  private setupIsPorteFeuilleListener(): void {
    const isPorteFeuilleControl = this.opForm.get('isPorteFeuille')
    const compteControl = this.opForm.get('compte')
    const numRegistreControl = this.opForm.get('numRegistre')
    const nineaControl = this.opForm.get('ninea')
    const datePorteFeuilleControl = this.opForm.get('datePorteFeuille')
    const pointCollecteIdControl = this.opForm.get('pointCollecteId')

    if (
      isPorteFeuilleControl &&
      compteControl &&
      numRegistreControl &&
      nineaControl &&
      datePorteFeuilleControl &&
      pointCollecteIdControl
    ) {
      isPorteFeuilleControl.valueChanges.subscribe((isChecked: boolean) => {
        if (isChecked) {
          compteControl.enable()
          numRegistreControl.enable()
          nineaControl.enable()
          datePorteFeuilleControl.enable()
          pointCollecteIdControl.enable()
          compteControl.setValidators([Validators.required])
          numRegistreControl.setValidators([Validators.required])
          nineaControl.setValidators([Validators.required])
          datePorteFeuilleControl.setValidators([Validators.required])
          pointCollecteIdControl.setValidators([Validators.required])
        } else {
          compteControl.patchValue(null)
          compteControl.disable()
          numRegistreControl.patchValue(null)
          numRegistreControl.disable()
          nineaControl.patchValue(null)
          nineaControl.disable()
          datePorteFeuilleControl.patchValue(null)
          datePorteFeuilleControl.disable()

          compteControl.clearValidators()
          nineaControl.clearValidators()
          numRegistreControl.clearValidators()
          datePorteFeuilleControl.clearValidators()
          pointCollecteIdControl.patchValue(null)
          pointCollecteIdControl.disable()
        }

        compteControl.updateValueAndValidity()
        numRegistreControl.updateValueAndValidity()
        nineaControl.updateValueAndValidity()
        datePorteFeuilleControl.updateValueAndValidity()
        pointCollecteIdControl.updateValueAndValidity()
      })
    }
  }

  onIsPorteFeuilleChange(event: { checked: boolean }): void {
    const isChecked = event.checked // PrimeNG renvoie un objet avec la propriété 'checked'
    console.log('✅ bla bla bla', isChecked)
    if (isChecked) {
      console.log('✅ Est client coché')
      // activer un champ, envoyer une requête, etc.
    } else {
      console.log('❌ Est client décoché')
      // désactiver des choses si besoin
    }
  }

  onSelectDateChange(event: { value: Date }) {
    this.selectedDate = event.value
    console.log('⭐ ⭐ ⭐ selectedDate: ' + this.selectedDate)
  }
  onSelectLocalite(event: ILocalite) {
    console.log('event', event)
  }
  getDepartmentColor(departmentName: string): string {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-yellow-100 text-yellow-800',
      'bg-purple-100 text-purple-800',
      'bg-pink-100 text-pink-800',
      'bg-red-100 text-red-800',
      'bg-indigo-100 text-indigo-800',
    ]
    const hash = [...departmentName].reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0,
    )
    return colors[hash % colors.length]
  }

  refreshComponent() {
    this.router.navigateByUrl('/ops', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url])
    })
  }
  private initDispatch(): void {
    /*
    this.store.dispatch(fromOps.getOps())
    this.store.dispatch(fromOps.getOps())
    this.store.dispatch(fromPersonnes.getPersonnes())
    this.store.dispatch(fromSocietes.getSocietes())
    this.store.dispatch(fromTypeOps.getTypeOps())
    this.store.dispatch(fromTypeOps.getTypeOps())
    this.store.dispatch(fromTypeSocietes.getTypeSocietes())
    this.store.dispatch(fromProfessions.getProfessions())
    */
    this.store.dispatch(fromPointAgences.getPointAgences())
    this.store.dispatch(fromAgences.getAgences())

    const myFilter: IFilter = {
      opId: null,
      societeOpId: null,
      societeAgenceOpId: null,
      agenceOpId: null,
      pointId: null,
      formeJuridiqueId: null,
      localiteId: null,
      page: 1,
      limit: 10000,
    }
    let choosenPortefeuille: number[] = []
    if (this.selectedPortefeuille !== 1) {
      if (this.selectedPortefeuille === 2) {
        choosenPortefeuille = [this.appService.getLocalselectedSocieteId()]
      }
      myFilter.societeOpId = choosenPortefeuille
    }

    // const result = A.filter((item) => !B.includes(item))

    let choosenAgences: number[] = []
    if (this.selectedAgences?.length > 0) {
      choosenAgences = this.selectedAgences.map((item) => item)
      myFilter.agenceOpId = choosenAgences
    }
    /*
    myFilter.societeAgenceOpId =
      this.selectedAgences.length > 0 ? this.selectedAgences[0] : null
    */
    // myFilter.societeOpId = this.appService.getLocalselectedSocieteId()
    // myFilter.societeAgenceOpId = this.appService.getLocalselectedSocieteId()
    // myFilter.agenceOpId = this.appService.getLocalselectedAgenceId()

    // console.log('myFilter before: ', myFilter)

    this.appService.removeNullProperties(myFilter)
    // console.log('myFilter after: ', myFilter)

    this.store.dispatch(
      fromOps.getOpsWithFilters({
        filter: {
          ...myFilter,
        },
      }),
    )

    this.opsWithFilters$ = this.store.pipe(
      select(fromOps.selectOpsWithFiltersList),
    )

    this.pointsCollectesFromAgence$ = this.store.pipe(
      select(fromPointAgences.selectPointAgencesList),
    )

    this.pointsCollectesFromAgence$.subscribe((data: IPointAgence[]) => {
      this.pointsCollectesFromAgence = data.map((device: IPointAgence) => {
        return { ...device }
      })
      console.log(
        'this.pointsCollectesFromAgence: ',
        this.pointsCollectesFromAgence,
      )
      this.myPointsOnAgence = this.getPointsByAgence(
        this.pointsCollectesFromAgence,
        parseInt(this.appService.getLocalselectedAgenceId()),
      )
      // this.filteredPoints = [...this.myPointsOnAgence]
      console.log('✅ ✅ ✅  ✅ ✅ ✅  mesPoints: ', this.myPointsOnAgence)
    })
  }

  private async initSubscriptions(): Promise<void> {
    /////////////////////// BEGIN ///////////////////////////////
    console.time('Time this')
    this.opsWithFiltersSubscription = this.opsWithFilters$.subscribe(
      async (datas: IOp[]) => {
        if (datas) {
          // Utilisation de Promise.all pour attendre que tous les devices soient chargés
          this.opsWithFilters = await Promise.all(
            datas.map(
              async (device: IOp) => {
                // Vérifiez si le device est complètement chargé (par exemple, en vérifiant une propriété clé)

                if (!device) {
                  console.warn('Device incomplet : ', device)
                  return device
                }
                if (!device.SocieteOp) {
                  console.warn('Device societeOps incomplet : ', device)
                  return device
                }
                if (!device.AgenceOp) {
                  console.warn('Device agenceOps incomplet : ', device)
                  return device
                }

                // Appliquer le filtre sur societeOps avant d'accéder aux propriétés
                const filteredSocietes = device.SocieteOp.filter(
                  (societe) =>
                    societe.societeId ===
                    parseInt(this.appService.getLocalselectedSocieteId()),
                )
                // Si un élément correspond au filtre, on récupère les données de cet élément
                const societe =
                  filteredSocietes.length > 0 ? filteredSocietes[0] : null

                // Appliquer le filtre sur agenceOps avant d'accéder aux propriétés

                const filteredOpsOnSociete = device.AgenceOp.filter(
                  (agenceOp) =>
                    agenceOp.agence?.societeId ===
                    parseInt(this.appService.getLocalselectedSocieteId()),
                )

                const filteredOpsOnAgence = device.AgenceOp.filter(
                  (agence) =>
                    agence.agenceId ===
                    parseInt(this.appService.getLocalselectedAgenceId()),
                )

                const filteredOpsOnAgences = device.AgenceOp.filter((agence) =>
                  this.idsAgences.includes(agence.agenceId),
                )
                // console.log('filteredOpsOnAgences: ', filteredOpsOnAgences)

                // Ajout de la propriété "ninea" directement dans l'objet
                return {
                  ...device,
                  formeJuridiqueName: device.formeJuridique?.name,
                  localiteName: device.localite?.name,
                  compte: societe ? societe.compte : '',
                  numRegistre: societe ? societe.numRegistre : '',
                  ninea: societe ? societe.ninea : '',

                  havePortefeuille: device.AgenceOp.length > 0 ? true : false,

                  havePortefeuilleOnSociete:
                    filteredOpsOnSociete.length > 0 ? true : false,

                  havePortefeuilleOnAgence:
                    filteredOpsOnAgence.length > 0 ? true : false,

                  havePortefeuilleOnAgences:
                    filteredOpsOnAgences.length > 0 ? true : false,
                }
              },
              setTimeout(() => {
                this.loading = false
              }, 1500),
            ),
          )
        }
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

  async refreshPage() {
    this.loading = true
    await this.initDispatch()
    // await this.initSubscriptions()
    this.initSubscriptionsProgress()
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

  async executeCustomInitSubscriptions(): Promise<void> {
    // Custom code to execute during each progress update
    return new Promise((resolve) => {
      console.log('Executing custom code...')
      // Simulate a delay for custom code execution
      this.initSubscriptions()
      setTimeout(() => {
        resolve()
      }, 500) // Simulate custom code execution time
    })
  }

  getPointsByAgence(data: IPointAgence[], agenceId: number): IPoint[] {
    const seen = new Set<number>()
    const points: IPoint[] = []

    for (const item of data) {
      if (item.agenceId === agenceId && !seen.has(item.pointId)) {
        seen.add(item.pointId)
        points.push(item.point as IPoint)
      }
    }

    return points
  }

  filterPonitCollecte(event: AutoCompleteCompleteEvent): void {
    const query = event.query?.toLowerCase() || ''

    if (query.trim() === '') {
      // Si la saisie est vide, afficher tous les éléments
      this.filteredPoints = [...this.myPointsOnAgence]
    } else {
      // Sinon, filtrer selon la saisie
      this.filteredPoints = this.myPointsOnAgence.filter((point) =>
        point.name.toLowerCase().includes(query),
      )
    }
  }

  hideDialog() {
    this.opDialogDisplay = false
    this.submitted = false
    this.onReloadOp()
    if (this.isEditMode) {
      console.log('this.isEditMode: ', this.isEditMode)
    }
  }
  openNew() {
    this.submitted = false
    this.titleHeader = 'New Op'
    this.opDialogDisplay = true
    this.viderOp()
  }

  showDialogOp(action: string) {
    this.opDialogDisplay = true
    this.isEditMode = false
    if (action === 'add') {
      this.titleOpDialogCredit = 'AJOUTER UN OP'
    } else if (action === 'update') {
      this.titleOpDialogCredit = 'MODIFIER UN OP'
    }
  }

  editOp(op: IOp) {
    this.op = { ...op }

    console.log(' this.op    --- ', op)
    this.titleHeader = 'Update Op'
    this.opDialogDisplay = true
  }

  saveOp() {
    this.submitted = true

    console.log(' this.op    --- ', this.op)

    if (this.op.id) {
      console.log('Update this.op --- ', this.op)
      /* UPDATE CLIENT */
      // this.store.dispatch(fromPointServiceActions.updatePointService({ body }));
      this.store.dispatch(
        fromOps.updateOp({
          op: this.op,
        }),
      )
      this.viderOp()
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Op Updated',
        life: 3000,
      })
    } else {
      //this.op = {id: 1, code: '0009', name: 'Astou DIOP', adresse: 'ras', telephone: '0778451236', fax: '0778451236', email: 'i3fXU@example.com', typeOp: {id: 1, name: 'PERSONNE'} };
      console.log('Add this.op --- ', this.op)
      /* CREATE CLIENT */
      //this.store.dispatch(fromPointServiceActions.createPointService({ body }));
      this.store.dispatch(
        fromOps.createOp({
          op: this.op,
        }),
      )
      this.viderOp()
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Op Created',
        life: 3000,
      })
    }

    this.ops = [...this.ops]
    this.opDialogDisplay = false
  }

  isMoment(MyMomment: string | Date | moment.Moment) {
    const newDate = moment(MyMomment).format('DD/MM/YYYY')
    return newDate
  }

  isMomentAutre(MyMomment: string | Date | moment.Moment) {
    const newDate = moment(MyMomment).format('YYYY-MM-DD')
    return newDate
  }

  viderOp() {
    this.op = {
      id: 0,
      name: '',
      sigle: '',
      email: '',
      telephone: '',
      adresse: '',
      latitude: 0,
      longitude: 0,
      prenomContact: '',
      nomContact: '',
      emailContact: '',
      telephoneContact: '',
      isActive: true,
      formeJuridiqueId: 0,
      localiteId: 0,
      pointId: 0,
    }

    this.chargerOp()
  }

  chargerOp() {
    //this.initDispatch();
    this.initSubscriptions()
  }

  clear(table: Table) {
    this.globalFilter = ''
    table.clear()
  }

  detailOp(idOp: number): void {
    console.log(`Detail op with ID ${idOp}`)
    // TO DO: implement the logic to display op details
  }

  onClicked(event: Event) {
    // If you expect a specific structure, you can cast or define a custom type
    // For example, if event is a MouseEvent:
    // onClicked(event: MouseEvent) { ... }
    // Or if event has a value property:
    // onClicked(event: { value: any }) { ... }
    // Adjust as needed for your use case

    // Example for generic Event with possible value property:
    const target = event.target as HTMLInputElement | null
    if (target && 'value' in target) {
      console.log(target.value)
    } else {
      console.log(event)
    }
  }

  getValue($event: Event): string {
    console.log(($event.target as HTMLInputElement).value)
    return ($event.target as HTMLInputElement).value
  }

  onFilter(event: { filteredValue: IOp[] }, dt: Table) {
    dt.filteredValue = event.filteredValue
  }

  tableauPointServicesXLSX(): void {
    console.log('tableauPointServicesXLSX')
  }

  onRowExpandRetourne(event: TableRowExpandEvent): void {
    console.log('event   --- ', event.data)
    console.log('event.data --- ', event.data.id)
    console.log('event.data --- ', event.data.name)
  }

  onRowExpandRetournePersonne(event: TableRowExpandEvent): void {
    console.log('event   --- ', event.data)
    console.log('event.data --- ', event.data.id)
    console.log('event.data --- ', event.data.name)

    if (event.data.typeOp.name === 'PERSONNE') {
      return
    }
  }

  onClearTypeOp(): void {
    this.isPersonne = false
    this.isSociete = false
  }

  getTypeSociete(option: ITypeSociete): string {
    return option.name
  }

  showDetailOp(op: IOp) {
    if (!op) {
      this.messageService.add({
        severity: 'error',
      })
      return
    }
    console.log(op)
    //// this.opService.editedOp = clone(op)
    //// this.router.navigate(['/credit'])
  }

  ajouterOp() {
    console.log('✅ ✅ ✅  ajouterOp')
    console.log('✅ ✅ ✅  this.opForm.value', this.opForm.value)

    const myOpPorteFeuille: CreateOpPortefeuilleDto = {
      name: this.opForm.value.name,
      sigle: this.opForm.value.sigle,
      email: this.opForm.value.email,
      telephone: this.opForm.value.telephone,
      adresse: this.opForm.value.adresse,
      latitude: this.opForm.value.latitude,
      longitude: this.opForm.value.longitude,
      prenomContact: this.opForm.value.prenomContact,
      nomContact: this.opForm.value.nomContact,
      emailContact: this.opForm.value.emailContact,
      telephoneContact: this.opForm.value.telephoneContact,
      isActive: this.opForm.value.isActive,
      formeJuridiqueId: this.opForm.value.formeJuridiqueId,
      localiteId: this.opForm.value.localiteId.id,
      pointId: this.opForm.value.pointId,

      agencePortefeuilleId: parseInt(
        this.appService.getLocalselectedAgenceId(),
      ),
      societePortefeuilleId: parseInt(
        this.appService.getLocalselectedSocieteId(),
      ),
      pointPortefeuilleId: this.opForm.value.pointCollecteId.id,
      compte: this.opForm.value.compte,
      numRegistre: this.opForm.value.numRegistre,
      ninea: this.opForm.value.ninea,
    }
    console.log('✅ ✅ ✅  myOpPorteFeuille', myOpPorteFeuille)

    this.store.dispatch(
      fromOps.createOpPortefeuille({ opPortefeuille: myOpPorteFeuille }),
    )
  }
  modifierOp() {
    console.log('✅ ✅ ✅  modifierOp')
    console.log('✅ ✅ ✅  this.opForm.value', this.opForm.value)
  }
  supprimerOp() {
    console.log('✅ ✅ ✅  supprimerOp')
  }
  onSaveOp() {
    this.submitted = true
    if (this.opForm.invalid) return

    if (this.actionSave == 'update') {
      this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir modifier ce credit?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.modifierOp()
        },
        reject: () => {
          this.msgs = [
            {
              severity: 'warning',
              summary: 'Annulation',
              detail: 'Vous avez annulé la modification',
              life: 2000,
            },
          ]
        },
      })
    } else if (this.actionSave == 'delete') {
      this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir supprimer ce credit?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.supprimerOp()
        },
        reject: () => {
          this.msgs = [
            {
              severity: 'danger',
              summary: 'Annulation',
              detail: 'Vous avez annulé la suppression',
              life: 2000,
            },
          ]
        },
      })
    } else {
      this.ajouterOp()
    }
    //this.credits = [...this.credits]
    //this.exploitations = [...this.exploitations]
    this.isEditMode = true
  }
  onReloadOp(): void {
    this.navigationService.reloadRoute(
      '/ops',
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
}
export enum PageNames {
  DebutPage,
  FinPage,
}

export interface IFilter {
  opId: number | null
  societeOpId: number[] | null
  societeAgenceOpId: number[] | null
  agenceOpId: number[] | null
  pointId: number[] | null
  formeJuridiqueId: number[] | null
  localiteId: number[] | null
  page: number | null
  limit: number | null
}

export interface Agence {
  id: number
  name: string
}

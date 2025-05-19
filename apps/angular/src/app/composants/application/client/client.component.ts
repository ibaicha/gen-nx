import { Component, ElementRef, Inject, ViewChild, OnInit } from '@angular/core'

import { MessageService, SharedModule } from 'primeng/api'
import { Observable, Subscription } from 'rxjs'

import { select, Store } from '@ngrx/store'
import * as fromClients from '../../../store/client'
import * as fromOps from '../../../store/op'

import * as fromTypeSocietes from '../../../store/type_societe'
import moment from 'moment'

import { Table, TableModule } from 'primeng/table'

import { Router } from '@angular/router'

import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { InputTextareaModule } from 'primeng/inputtextarea'

import { DropdownModule } from 'primeng/dropdown'
import { DialogModule } from 'primeng/dialog'
import { NgFor, NgIf, NgSwitch, NgSwitchDefault } from '@angular/common'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { ToolbarModule } from 'primeng/toolbar'
import { ToastModule } from 'primeng/toast'
import { OpService } from '../../../services/op.service'
import { AppService } from '../../../services/app.service'
import { IOp, ITypeSociete } from '@shared-models'

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  standalone: true,
  imports: [
    ToastModule,
    ToolbarModule,
    SharedModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    NgFor,
    NgIf,
    NgSwitch,
    NgSwitchDefault,
    DialogModule,
    DropdownModule,
    InputTextareaModule,
    ConfirmDialogModule,
  ],
})
export class ClientComponent implements OnInit {
  cols: { field: string; header: string; sort: boolean; filter: boolean }[] = []
  @ViewChild('dt') dt!: Table
  @ViewChild('mapElement') mapElement!: ElementRef

  submitted = false
  titleHeader = 'New Client'
  clientDialog = false

  clients$: Observable<IOp[]> | undefined
  clients: IOp[] = []
  client: IOp = {} as IOp
  selectedClients: IOp[] | undefined

  /*
  opWithFilters$!: Observable<IOpCustom[]>
  private opWithFiltersSubscription: Subscription | undefined
  opWithFilters: IOpCustom[] = []
  op: IOp = {} as IOp
  selectedopWithFilters: IOpCustom[] | undefined
  */

  opsWithFilters$!: Observable<IOp[]>
  private opsWithFiltersSubscription: Subscription | undefined
  opsWithFilters: IOp[] = []
  op: IOp = {} as IOp
  selectedopsWithFilters: IOp[] | undefined

  ops$: Observable<IOp[]> | undefined
  ops: IOp[] = []
  selectedOps: IOp[] | undefined

  isPersonne = false
  isSociete = false

  typeSocietes$!: Observable<ITypeSociete[]>
  typeSocietes: ITypeSociete[] = []

  isLoading$: Observable<boolean> | undefined
  isLoadingOps$: Observable<boolean> | undefined

  disableAdd = false
  loading = false

  constructor(
    //private router: Router,
    @Inject(Router) private router: Router,
    private readonly store: Store,

    private clientService: OpService,
    private opService: OpService,
    public appService: AppService,
    private messageService: MessageService,
  ) {}

  ngBeforeViewInit() {
    this.client = {
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
        header: 'ORGANISATION PAYSANNE',
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
      { field: 'localiteName', header: 'LOCALITE', sort: true, filter: true },
      //{ field: 'pointName', header: 'P.C', sort: true, filter: true },
    ]
    this.initDispatch()
    //this.initSubscriptions()
    this.viderClient()
  }

  onCreateClient(client: IOp): void {
    this.store.dispatch(fromClients.createClient({ client }))
  }

  onUpdateClient(client: IOp): void {
    this.store.dispatch(fromClients.updateClient({ client }))
  }

  onDeleteClient(client: IOp): void {
    this.store.dispatch(fromClients.deleteClient({ client }))
  }

  onGetClient(id: number, listClients: IOp[]): IOp | undefined {
    const _Client = listClients.find((item) => item.id === id)
    //console.log(_Client);
    return _Client
  }

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Initialise les dispatchers pour récupérer les données des différentes entités
   * Utilisé pour charger les données initiales de la page
   * @returns {void}
/*******  d3b9b29e-4c4b-415c-96b6-9fefa6567cdf  *******/ private initDispatch(): void {
    /*
    this.store.dispatch(fromClients.getClients())
    this.store.dispatch(fromOps.getOps())
    this.store.dispatch(fromPersonnes.getPersonnes())
    this.store.dispatch(fromSocietes.getSocietes())
    this.store.dispatch(fromTypeClients.getTypeClients())
    this.store.dispatch(fromTypeOps.getTypeOps())
    this.store.dispatch(fromTypeSocietes.getTypeSocietes())
    this.store.dispatch(fromProfessions.getProfessions())
    */

    const myFilter: IFilter = {
      opId: null,
      societeOpId: null,
      societeAgenceOpId: null,
      agenceOpId: null,
      pointId: null,
      formeJuridiqueId: null,
      localiteId: null,
      page: 1,
      limit: 10,
    }

    myFilter.societeOpId = this.appService.getLocalselectedSocieteId()
    myFilter.societeAgenceOpId = this.appService.getLocalselectedSocieteId()
    myFilter.agenceOpId = this.appService.getLocalselectedAgenceId()

    console.log('myFilter before: ', myFilter)

    this.appService.removeNullProperties(myFilter)
    console.log('myFilter after: ', myFilter)

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
  }

  private initSubscriptions(): void {
    this.clients$ = this.store.pipe(select(fromClients.selectClientsList))
    this.isLoading$ = this.store.pipe(select(fromClients.selectClientIsLoading))

    this.ops$ = this.store.pipe(select(fromOps.selectOpsList))
    this.isLoadingOps$ = this.store.pipe(select(fromOps.selectOpIsLoading))

    this.typeSocietes$ = this.store.pipe(
      select(fromTypeSocietes.selectTypeSocietesList),
    )

    /*
    this.clients$.subscribe((data: any[]) => {
      //this.clients = data;
      this.clients = data.map((device: any) => {
        return { ...device }
      })
  
    })
    */

    this.opsWithFiltersSubscription = this.opsWithFilters$.subscribe(
      (datas: IOp[]) => {
        if (datas) {
          this.opsWithFilters = datas.map((device: IOp) => {
            // console.log('opsWithFilters: ', datas)

            // Ajout de la propriété "ninea" directement dans l'objet
            return {
              ...device,
              compte: device.SocieteOp?.[0]?.compte,
              numRegistre: device.SocieteOp?.[0]?.numRegistre,
              ninea: device.SocieteOp?.[0]?.ninea,
              // Ajout de la propriété "ninea"
            }
          })
        }
      },
    )

    this.ops$.subscribe((data: IOp[]) => {
      this.ops = data
      this.ops = data.map((device: IOp) => {
        return { ...device }
      })
    })

    this.typeSocietes$.subscribe((data: ITypeSociete[]) => {
      this.typeSocietes = data.map((device: ITypeSociete) => {
        return { ...device }
      })
      /*
    this.typeSocietes.forEach((item) => {
      console.log(item);

      });
     */
    })
  }

  hideDialog() {
    this.clientDialog = false
    this.submitted = false
  }
  openNew() {
    this.submitted = false
    this.titleHeader = 'New Client'
    this.clientDialog = true
    this.viderClient()
  }

  editClient(client: IOp) {
    this.client = { ...client }

    console.log(' this.client    --- ', client)
    this.titleHeader = 'Update Client'
    this.clientDialog = true
  }

  saveClient() {
    this.submitted = true

    console.log(' this.client    --- ', this.client)

    if (this.client.id) {
      console.log('Update this.client --- ', this.client)
      /* UPDATE CLIENT */
      // this.store.dispatch(fromPointServiceActions.updatePointService({ body }));
      this.store.dispatch(
        fromClients.updateClient({
          client: this.client,
        }),
      )
      this.viderClient()
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Client Updated',
        life: 3000,
      })
    } else {
      //this.client = {id: 1, code: '0009', name: 'Astou DIOP', adresse: 'ras', telephone: '0778451236', fax: '0778451236', email: 'i3fXU@example.com', typeClient: {id: 1, name: 'PERSONNE'} };
      console.log('Add this.client --- ', this.client)
      /* CREATE CLIENT */
      //this.store.dispatch(fromPointServiceActions.createPointService({ body }));
      this.store.dispatch(
        fromClients.createClient({
          client: this.client,
        }),
      )
      this.viderClient()
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Client Created',
        life: 3000,
      })
    }

    this.clients = [...this.clients]
    this.clientDialog = false
  }

  isMoment(MyMomment: string | Date | moment.Moment) {
    const newDate = moment(MyMomment).format('DD/MM/YYYY')
    return newDate
  }

  isMomentAutre(MyMomment: string | Date | moment.Moment) {
    const newDate = moment(MyMomment).format('YYYY-MM-DD')
    return newDate
  }

  viderClient() {
    this.client = {
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

    this.chargerClient()
  }

  chargerClient() {
    //this.initDispatch();
    this.initSubscriptions()
  }

  clear(table: Table) {
    table.clear()
  }

  detailClient(idClient: number): void {
    console.log(`Detail client with ID ${idClient}`)
    // TO DO: implement the logic to display client details
  }

  onClicked(event: Event) {
    // If the event target is an input element, access its value safely
    const target = event.target as HTMLInputElement
    console.log(target.value)
  }

  getValue($event: Event): string {
    console.log(($event.target as HTMLInputElement).value)
    return ($event.target as HTMLInputElement).value
  }

  onFilter(event: any, dt: any) {
    dt.filteredValues = event.filteredValue
  }

  tableauPointServicesXLSX(): void {
    console.log('tableauPointServicesXLSX')
  }

  onRowExpandRetourne(event: { data: IOp }): void {
    console.log('event   --- ', event.data)
    console.log('event.data --- ', event.data.id)
    console.log('event.data --- ', event.data.name)
  }

  onRowExpandRetournePersonne(event: {
    data: { id: number; name: string; typeClient: { name: string } }
  }): void {
    console.log('event   --- ', event.data)
    console.log('event.data --- ', event.data.id)
    console.log('event.data --- ', event.data.name)

    if (event.data.typeClient.name === 'PERSONNE') {
      return
    }
  }

  onChangeTypeClient(event: {
    value: { id: number; [key: string]: unknown }
  }): void {
    console.log(event.value)
    console.log('event_id :' + event.value['id'])
  }

  onClearTypeClient(): void {
    this.isPersonne = false
    this.isSociete = false
  }

  getTypeSociete(option: ITypeSociete): string {
    return option.name
  }

  showDetailClient(client: IOp) {
    if (!client) {
      this.messageService.add({
        severity: 'error',
      })
      return
    }
    //console.log(client);
    //this.clientService.editedClient = clone(client)
    this.router.navigate(['/credit'])
  }
}

export interface IFilter {
  opId: number | null
  societeOpId: number | null
  societeAgenceOpId: number | null
  agenceOpId: number | null
  pointId: number | null
  formeJuridiqueId: number | null
  localiteId: number | null
  page: number | null
  limit: number | null
}

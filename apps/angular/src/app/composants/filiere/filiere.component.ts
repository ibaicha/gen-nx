import { Component } from '@angular/core'
import { SortEvent, SharedModule } from 'primeng/api'
import { Observable } from 'rxjs'
 
import { select, Store } from '@ngrx/store'

import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { ToolbarModule } from 'primeng/toolbar'
import { IOp } from '@shared-models'

interface People {
  firstname?: string
  lastname?: string
  age?: string
}

@Component({
  selector: 'app-filiere',
  templateUrl: './filiere.component.html',
  styleUrls: ['./filiere.component.css'],
  standalone: true,
  imports: [ToolbarModule, SharedModule, ButtonModule, TableModule],
})
export class FiliereComponent {
  tableData: People[] = []
  cols: any[] = []
  cols1: any[] = []

  clients$!: Observable<IOp[]>
  clients: IOp[] = []
  isLoading$!: Observable<boolean>

  constructor(private readonly store: Store) {}
}

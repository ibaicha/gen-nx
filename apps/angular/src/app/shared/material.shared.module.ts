import { NgModule } from '@angular/core'
import { A11yModule } from '@angular/cdk/a11y'
import { CdkStepperModule } from '@angular/cdk/stepper'
import { CdkTableModule } from '@angular/cdk/table'
import { CdkTreeModule } from '@angular/cdk/tree'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { PortalModule } from '@angular/cdk/portal'
import { ScrollingModule } from '@angular/cdk/scrolling'

import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatBadgeModule } from '@angular/material/badge'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatChipsModule } from '@angular/material/chips'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatNativeDateModule } from '@angular/material/core'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatRadioModule } from '@angular/material/radio'
import { MatRippleModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSliderModule } from '@angular/material/slider'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSortModule } from '@angular/material/sort'
import { MatStepperModule } from '@angular/material/stepper'
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatTreeModule } from '@angular/material/tree'
import { FormsModule } from '@angular/forms'

const CDK_MODULES = [
  A11yModule,
  CdkStepperModule,
  CdkTableModule,
  CdkTreeModule,
  DragDropModule,
  PortalModule,
  ScrollingModule,]

const FORM_CONTROLS = [
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
]

const NAVIGATION = [
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTabsModule,
]

const LAYOUT = [
  MatCardModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatListModule,
  MatStepperModule,
  MatTreeModule,
]

const BUTTONS_AND_INDICATORS = [
  MatBadgeModule,
  MatChipsModule,
  MatIconModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRippleModule,
]

const POPUPS_AND_MODALS = [
  MatBottomSheetModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTooltipModule,
]

const DATA_TABLE = [
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
]

@NgModule({
  exports: [
    ...CDK_MODULES,
    ...FORM_CONTROLS,
    ...NAVIGATION,
    ...LAYOUT,
    ...BUTTONS_AND_INDICATORS,
    ...POPUPS_AND_MODALS,
    ...DATA_TABLE,

  ]
})
export class MaterialSharedModule {}

import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { RemboursementEffects } from './remboursement.effects'
import { remboursementReducer } from './remboursement.reducers'

/**
 * Module de store pour la gestion des remboursements
 * Configure le reducer et les effets pour le feature state 'remboursement'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'remboursement'
    StoreModule.forFeature('remboursement', remboursementReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([RemboursementEffects]),
  ],
})
export class RemboursementStoreModule {}

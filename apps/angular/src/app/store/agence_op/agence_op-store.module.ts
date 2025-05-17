import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { agenceOpReducer } from './agence_op.reducers'
import { AgenceOpEffects } from './agence_op.effects'

/**
 * Module de store pour la gestion des crédits
 * Configure le reducer et les effets pour le feature state 'agenceOp'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'agenceOp'
    StoreModule.forFeature('agenceOp', agenceOpReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([AgenceOpEffects]),
  ],
})
export class AgenceOpStoreModule {}

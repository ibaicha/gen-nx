import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { OpEffects } from './op.effects'
import { opReducer } from './op.reducers'

/**
 * Module de store pour la gestion des opérations
 * Configure le reducer et les effets pour le feature state 'op'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'op'
    StoreModule.forFeature('op', opReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([OpEffects]),
  ],
})
export class OpStoreModule {}

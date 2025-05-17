import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { AgenceEffects } from './agence.effects'
import { agenceReducer } from './agence.reducers'

/**
 * Module de store pour la gestion des sociétés
 * Configure le reducer et les effets pour le feature state 'agence'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'agence'
    StoreModule.forFeature('agence', agenceReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([AgenceEffects]),
  ],
})
export class AgenceStoreModule {}

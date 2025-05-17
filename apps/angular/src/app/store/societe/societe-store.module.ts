import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { SocieteEffects } from './societe.effects'
import { societeReducer } from './societe.reducers'

/**
 * Module de store pour la gestion des sociétés
 * Configure le reducer et les effets pour le feature state 'societe'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'societe'
    StoreModule.forFeature('societe', societeReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([SocieteEffects]),
  ],
})
export class SocieteStoreModule {}

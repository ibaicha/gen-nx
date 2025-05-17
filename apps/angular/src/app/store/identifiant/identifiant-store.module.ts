import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { IdentifiantEffects } from './identifiant.effects'
import { identifiantReducer } from './identifiant.reducers'

/**
 * Module de store pour la gestion des identifiants
 * Configure le reducer et les effets pour le feature state 'identifiant'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'identifiant'
    StoreModule.forFeature('identifiant', identifiantReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([IdentifiantEffects]),
  ],
})
export class IdentifiantStoreModule {}

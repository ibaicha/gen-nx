import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { VarieteEffects } from './variete.effects'
import { varieteReducer } from './variete.reducers'

/**
 * Module de store pour la gestion des variétés
 * Configure le reducer et les effets pour le feature state 'variete'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'variete'
    StoreModule.forFeature('variete', varieteReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([VarieteEffects]),
  ],
})
export class VarieteStoreModule {}

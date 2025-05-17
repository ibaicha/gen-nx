import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { FormeJuridiqueEffects } from './forme-juridique.effects'
import { formeJuridiqueReducer } from './forme-juridique.reducers'

/**
 * Module de store pour la gestion des formeJuridiques
 * Configure le reducer et les effets pour le feature state 'formeJuridique'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'formeJuridique'
    StoreModule.forFeature('formeJuridique', formeJuridiqueReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([FormeJuridiqueEffects]),
  ],
})
export class FormeJuridiqueStoreModule {}

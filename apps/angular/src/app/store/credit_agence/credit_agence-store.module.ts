import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { creditAgenceReducer } from './credit_agence.reducers'
import { CreditAgenceEffects } from './credit_agence.effects'

/**
 * Module de store pour la gestion des crédits
 * Configure le reducer et les effets pour le feature state 'creditAgence'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'creditAgence'
    StoreModule.forFeature('creditAgence', creditAgenceReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([CreditAgenceEffects]),
  ],
})
export class CreditAgenceStoreModule {}

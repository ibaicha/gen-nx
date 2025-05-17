import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { CreditEffects } from './credit.effects'
import { creditReducer } from './credit.reducers'

/**
 * Module de store pour la gestion des crédits
 * Configure le reducer et les effets pour le feature state 'credit'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'credit'
    StoreModule.forFeature('credit', creditReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([CreditEffects]),
  ],
})
export class CreditStoreModule {}

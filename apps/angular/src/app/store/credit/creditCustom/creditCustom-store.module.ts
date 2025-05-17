import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { CreditCustomEffects } from './creditCustom.effects'
import { creditCustomReducer } from './creditCustom.reducers'

/**
 * Module de store pour la gestion des crédits personnalisés
 * Configure le reducer et les effets pour le feature state 'creditCustom'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'creditCustom'
    StoreModule.forFeature('creditCustom', creditCustomReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([CreditCustomEffects]),
  ],
})
export class CreditCustomStoreModule {}

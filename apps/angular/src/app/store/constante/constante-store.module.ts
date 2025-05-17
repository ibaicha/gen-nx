import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { constanteReducer } from './constante.reducer'
import { ConstanteEffects } from './constante.effects'


/**
 * Module de store pour la gestion des constantes
 * Configure le reducer et les effets pour le feature state 'constante'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'constante'
    StoreModule.forFeature('constante', constanteReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([ConstanteEffects]),
  ],
})
export class ConstanteStoreModule {}

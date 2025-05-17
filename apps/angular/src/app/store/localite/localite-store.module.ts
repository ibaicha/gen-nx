import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { LocaliteEffects } from './localite.effects'
import { localiteReducer } from './localite.reducers'

/**
 * Module de store pour la gestion des localites
 * Configure le reducer et les effets pour le feature state 'localite'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'localite'
    StoreModule.forFeature('localite', localiteReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([LocaliteEffects]),
  ],
})
export class LocaliteStoreModule {}

import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { SaisonEffects } from './saison.effects'
import { saisonReducer } from './saison.reducers'

/**
 * Module de store pour la gestion des saisons
 * Configure le reducer et les effets pour le feature state 'saison'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'saison'
    StoreModule.forFeature('saison', saisonReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([SaisonEffects]),
  ],
})
export class SaisonStoreModule {}

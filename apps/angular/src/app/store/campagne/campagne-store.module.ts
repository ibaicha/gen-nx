import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { CampagneEffects } from './campagne.effects'
import { campagneReducer } from './campagne.reducers'

/**
 * Module de store pour la gestion des campagnes
 * Configure le reducer et les effets pour le feature state 'campagne'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'campagne'
    StoreModule.forFeature('campagne', campagneReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([CampagneEffects]),
  ],
})
export class CampagneStoreModule {}

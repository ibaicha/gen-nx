import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { PointAgenceEffects } from './point_agence.effects'
import { pointAgenceReducer } from './point_agence.reducers'

/**
 * Module de store pour la gestion des points d'agence
 * Configure le reducer et les effets pour le feature state 'pointAgence'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'pointAgence'
    StoreModule.forFeature('pointAgence', pointAgenceReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([PointAgenceEffects]),
  ],
})
export class PointAgenceStoreModule {}

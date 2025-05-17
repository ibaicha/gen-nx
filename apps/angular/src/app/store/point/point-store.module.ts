import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { PointEffects } from './point.effects'
import { pointReducer } from './point.reducers'

/**
 * Module de store pour la gestion des points
 * Configure le reducer et les effets pour le feature state 'point'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'point'
    StoreModule.forFeature('point', pointReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([PointEffects]),
  ],
})
export class PointStoreModule {}

import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { FamilleEmplacementEffects } from './famille_emplacement.effects'
import { familleEmplacementReducer } from './famille_emplacement.reducers'

/**
 * Module de store pour la gestion des familles d'emplacement
 * Configure le reducer et les effets pour le feature state 'familleEmplacement'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'familleEmplacement'
    StoreModule.forFeature('familleEmplacement', familleEmplacementReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([FamilleEmplacementEffects]),
  ],
})
export class FamilleEmplacementStoreModule {}

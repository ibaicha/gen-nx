import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { FiliereEffects } from './filiere.effects'
import { filiereReducer } from './filiere.reducers'

/**
 * Module de store pour la gestion des filières
 * Configure le reducer et les effets pour le feature state 'filiere'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'filiere'
    StoreModule.forFeature('filiere', filiereReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([FiliereEffects]),
  ],
})
export class FiliereStoreModule {}

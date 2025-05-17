import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { TypeSocieteEffects } from './type-societe.effects'
import { typeSocieteReducer } from './type-societe.reducers'

/**
 * Module de store pour la gestion des types de sociétés
 * Configure le reducer et les effets pour le feature state 'typeSociete'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'typeSociete'
    StoreModule.forFeature('typeSociete', typeSocieteReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([TypeSocieteEffects]),
  ],
})
export class TypeSocieteStoreModule {}

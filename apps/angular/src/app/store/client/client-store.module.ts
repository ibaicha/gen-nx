import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { ClientEffects } from './client.effects'
import { clientReducer } from './client.reducers'

/**
 * Module de store pour la gestion des clients
 * Configure le reducer et les effets pour le feature state 'client'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'client'
    StoreModule.forFeature('client', clientReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([ClientEffects]),
  ],
})
export class ClientStoreModule {}

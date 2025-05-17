import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { MouvementStockageEffects } from './mouvement_stockage.effects'
import { mouvementStockageReducer } from './mouvement_stockage.reducers'

/**
 * Module de store pour la gestion des mouvements de stockage
 * Configure le reducer et les effets pour le feature state 'mouvementStockage'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'mouvementStockage'
    StoreModule.forFeature('mouvementStockage', mouvementStockageReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([MouvementStockageEffects]),
  ],
})
export class MouvementStockageStoreModule {}

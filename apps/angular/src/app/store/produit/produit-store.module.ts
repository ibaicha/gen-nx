import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { ProduitEffects } from './produit.effects'
import { produitReducer } from './produit.reducers'

/**
 * Module de store pour la gestion des produits
 * Configure le reducer et les effets pour le feature state 'produit'
 */
@NgModule({
  imports: [
    // Enregistre le reducer pour le feature state 'produit'
    StoreModule.forFeature('produit', produitReducer),
    // Enregistre les effets pour la gestion des actions asynchrones
    EffectsModule.forFeature([ProduitEffects]),
  ],
})
export class ProduitStoreModule {}

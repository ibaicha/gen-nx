import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IProduitState } from './produit.model'

/**
 * Sélecteur de base pour l'état des produits
 */
export const selectProduitState =
  createFeatureSelector<IProduitState>('produit')

/**
 * Sélecteurs dérivés pour les différentes parties de l'état
 */

/**
 * Sélecteur pour obtenir la liste complète des produits
 */
export const selectProduitsList = createSelector(
  selectProduitState,
  (state) => state.produits,
)

/**
 * Sélecteur pour obtenir l'état de chargement
 */
export const selectProduitIsLoading = createSelector(
  selectProduitState,
  (state) => state.isLoading,
)

/**
 * Sélecteur pour obtenir un produit par son ID
 * @param itemId - ID du produit à rechercher
 */
export const selectProduitById = (itemId: number) =>
  createSelector(selectProduitState, (state) =>
    state.produits.find((item) => item.id === itemId),
  )

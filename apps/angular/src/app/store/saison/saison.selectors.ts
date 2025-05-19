import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ISaisonState } from './saison.model'

/**
 * Sélecteur de base pour l'état des saisons
 */
export const selectSaisonState = createFeatureSelector<ISaisonState>('saison')

/**
 * Sélecteurs dérivés pour les différentes parties de l'état
 */

/**
 * Sélecteur pour obtenir la liste complète des saisons
 */
export const selectSaisonsList = createSelector(
  selectSaisonState,
  (state) => state.saisons,
)

/**
 * Sélecteur pour obtenir l'état de chargement
 */
export const selectSaisonIsLoading = createSelector(
  selectSaisonState,
  (state) => state.isLoading,
)

/**
 * Sélecteur pour obtenir une saison par son ID
 * @param itemId - ID de la saison à rechercher
 */
export const selectSaisonById = (itemId: number) =>
  createSelector(selectSaisonState, (state) =>
    state.saisons.find((item) => item.id === itemId),
  )

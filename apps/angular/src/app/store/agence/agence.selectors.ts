import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IAgenceState } from './agence.model'

/**
 * Sélecteur de base pour l'état des sociétés
 */
export const selectAgenceState = createFeatureSelector<IAgenceState>('agence')

/**
 * Sélecteurs dérivés pour les différentes parties de l'état
 */

/**
 * Sélecteur pour obtenir la liste complète des sociétés
 */
export const selectAgencesList = createSelector(
  selectAgenceState,
  (state) => state.agences,
)

/**
 * Sélecteur pour obtenir l'état de chargement
 */
export const selectAgenceIsLoading = createSelector(
  selectAgenceState,
  (state) => state.isLoading,
)

/**
 * Sélecteur pour obtenir une société par son ID
 * @param itemId - ID de la société à rechercher
 */
export const selectAgenceById = (itemId: number) =>
  createSelector(selectAgenceState, (state) =>
    state.agences.find((item) => item.id === itemId),
  )

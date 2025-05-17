import { createFeatureSelector, createSelector } from '@ngrx/store'

import { IAgenceOpState } from './agence_op.model'

/**
 * Sélecteur de base pour l'état des crédits
 */
export const selectAgenceOpState =
  createFeatureSelector<IAgenceOpState>('agenceOp')

/**
 * Sélecteurs de base
 */
export const selectAgenceOpsList = createSelector(
  selectAgenceOpState,
  (state) => state.agenceOps,
)

export const selectAgenceOpIsLoading = createSelector(
  selectAgenceOpState,
  (state) => state.isLoading,
)

/**
 * Sélecteur pour obtenir la liste des agenceOps filtrés
 */
export const selectCreditsAgencesWithFiltersList = createSelector(
  selectAgenceOpState,
  (state) => state.creditsAgencesWithFilters,
)

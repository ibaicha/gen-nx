import { createFeatureSelector, createSelector } from '@ngrx/store'

import { ICreditAgenceState } from './credit_agence.model'

/**
 * Sélecteur de base pour l'état des crédits
 */
export const selectCreditAgenceState =
  createFeatureSelector<ICreditAgenceState>('creditAgence')

/**
 * Sélecteurs de base
 */
export const selectCreditAgencesList = createSelector(
  selectCreditAgenceState,
  (state) => state.creditAgences,
)

export const selectCreditAgenceIsLoading = createSelector(
  selectCreditAgenceState,
  (state) => state.isLoading,
)

/**
 * Sélecteur pour obtenir la liste des creditAgences filtrés
 */
export const selectCreditsAgencesWithFiltersList = createSelector(
  selectCreditAgenceState,
  (state) => state.creditsAgencesWithFilters,
)

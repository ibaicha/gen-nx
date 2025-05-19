import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ICreditCustomState } from './creditCustom.model'

/**
 * Sélecteur de base pour l'état des crédits personnalisés
 */
export const selectCreditCustomState =
  createFeatureSelector<ICreditCustomState>('creditCustom')

/**
 * Sélecteur pour obtenir la liste des crédits personnalisés
 */
export const selectCreditCustomsList = createSelector(
  selectCreditCustomState,
  (state) => state.creditCustoms,
)

/**
 * Sélecteur pour obtenir l'état de chargement
 */
export const selectCreditCustomIsLoading = createSelector(
  selectCreditCustomState,
  (state) => state.isLoading,
)

/**
 * Sélecteur pour obtenir un crédit personnalisé par son ID
 * @param itemId - ID du crédit personnalisé à rechercher
 */
export const selectCreditCustomById = (itemId: number) =>
  createSelector(selectCreditCustomState, (state) =>
    state.creditCustoms.find((item) => item.id === itemId),
  )

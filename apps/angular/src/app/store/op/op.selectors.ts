import { createFeatureSelector, createSelector } from '@ngrx/store'
import { GetOpParamsDTO, IOpState } from './op.model'

/**
 * Sélecteur de base pour l'état des opérations
 */
export const selectOpState = createFeatureSelector<IOpState>('op')

/**
 * Sélecteurs dérivés pour les différentes parties de l'état
 */

/**
 * Sélecteur pour obtenir la liste complète des opérations
 */
export const selectOpsList = createSelector(selectOpState, (state) => state.ops)

/**
 * Sélecteur pour obtenir la liste des opérations filtrées
 */
export const selectOpWithFiltersList = createSelector(
  selectOpState,
  (state) => state.ops,
)
/**
 * Sélecteur pour obtenir la liste des ops filtrés
 */
export const selectOpsWithFiltersList = createSelector(
  selectOpState,
  (state) => state.opsWithFilters,
)

/**
 * Sélecteur pour obtenir l'état de chargement
 */
export const selectOpIsLoading = createSelector(
  selectOpState,
  (state) => state.isLoading,
)

/**
 * Sélecteur pour obtenir la liste des opérations personnalisées par agence
 */
export const selectCustomCreditSocieteVarieteAnneeSaisonList = createSelector(
  selectOpState,
  (state) => state.opsCustomFromAgences,
)

/**
 * Sélecteur pour obtenir une opération par son ID
 * @param itemId - ID de l'opération à rechercher
 */
export const selectOpById = (itemId: number) =>
  createSelector(selectOpState, (state) =>
    state.ops.find((item) => item.id === itemId),
  )

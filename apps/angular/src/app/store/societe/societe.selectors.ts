import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ISocieteState } from './societe.model'

/**
 * Sélecteur de base pour l'état des sociétés
 */
export const selectSocieteState = createFeatureSelector<ISocieteState>('societe')

/**
 * Sélecteurs dérivés pour les différentes parties de l'état
 */

/**
 * Sélecteur pour obtenir la liste complète des sociétés
 */
export const selectSocietesList = createSelector(
  selectSocieteState,
  (state) => state.societes
)

/**
 * Sélecteur pour obtenir l'état de chargement
 */
export const selectSocieteIsLoading = createSelector(
  selectSocieteState,
  (state) => state.isLoading
)

/**
 * Sélecteur pour obtenir une société par son ID
 * @param itemId - ID de la société à rechercher
 */
export const selectSocieteById = (itemId: number) => createSelector(
  selectSocieteState,
  (state) => state.societes.find((item) => item.id === itemId)
)

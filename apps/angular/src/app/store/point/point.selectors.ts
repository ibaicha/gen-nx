import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IPointState } from './point.model'

/**
 * Sélecteur de base pour l'état des points
 */
export const selectPointState = createFeatureSelector<IPointState>('point')

/**
 * Sélecteurs dérivés pour les différentes parties de l'état
 */

/**
 * Sélecteur pour obtenir la liste complète des points
 */
export const selectPointsList = createSelector(
  selectPointState,
  (state) => state.points
)

/**
 * Sélecteur pour obtenir l'état de chargement
 */
export const selectPointIsLoading = createSelector(
  selectPointState,
  (state) => state.isLoading
)

/**
 * Sélecteur pour obtenir un point par son ID
 * @param itemId - ID du point à rechercher
 */
export const selectPointById = (itemId: number) => createSelector(
  selectPointState,
  (state) => state.points.find((item) => item.id === itemId)
)

import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ILocaliteState } from './localite.model'

/**
 * Sélecteur de base pour l'état des localites
 */
export const selectLocaliteState =
  createFeatureSelector<ILocaliteState>('localite')

/**
 * Sélecteurs dérivés pour les différentes parties de l'état
 */

/**
 * Sélecteur pour obtenir la liste complète des localites
 */
export const selectLocalitesList = createSelector(
  selectLocaliteState,
  (state) => state.localites,
)

/**
 * Sélecteur pour obtenir l'état de chargement
 */
export const selectLocaliteIsLoading = createSelector(
  selectLocaliteState,
  (state) => state.isLoading,
)

/**
 * Sélecteur pour obtenir une localite par son ID
 * @param itemId - ID de la localite à rechercher
 */
export const selectLocaliteById = (itemId: number) =>
  createSelector(selectLocaliteState, (state) =>
    state.localites.find((item) => item.id === itemId),
  )

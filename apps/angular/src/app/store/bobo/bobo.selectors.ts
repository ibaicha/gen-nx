import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IBoboState } from './bobo.model'

/**
 * Sélecteur de base pour accéder à l'état des bobos
 */
export const selectBoboState = createFeatureSelector<IBoboState>('bobo')

/**
 * Sélecteurs dérivés pour les différentes parties de l'état
 */

/**
 * Sélecteur pour obtenir la liste complète des bobos
 * @returns {IBobo[]} Liste des bobos
 */
export const selectBobosList = createSelector(
  selectBoboState,
  (state) => state.bobos
)

/**
 * Sélecteur pour obtenir l'état de chargement
 * @returns {boolean} État de chargement
 */
export const selectBoboIsLoading = createSelector(
  selectBoboState,
  (state) => state.isLoading
)

/**
 * Sélecteur pour obtenir un bobo spécifique par son ID
 * @param {number} itemId - ID du bobo recherché
 * @returns {IBobo | undefined} Bobo correspondant ou undefined si non trouvé
 */
export const selectBoboById = (itemId: number) => createSelector(
  selectBoboState,
  (state) => state.bobos.find(item => item.id === itemId)
)

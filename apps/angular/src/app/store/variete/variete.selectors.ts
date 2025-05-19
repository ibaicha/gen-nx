import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IVarieteState } from './variete.model'

/**
 * Sélecteur de base pour accéder à l'état des variétés
 */
export const selectVarieteState =
  createFeatureSelector<IVarieteState>('variete')

/**
 * Sélecteurs dérivés pour les différentes parties de l'état
 */

/**
 * Sélecteur pour obtenir la liste complète des variétés
 * @returns {IVariete[]} Liste des variétés
 */
export const selectVarietesList = createSelector(
  selectVarieteState,
  (state) => state.varietes,
)

/**
 * Sélecteur pour obtenir l'état de chargement
 * @returns {boolean} État de chargement
 */
export const selectVarieteIsLoading = createSelector(
  selectVarieteState,
  (state) => state.isLoading,
)

/**
 * Sélecteur pour obtenir une variété spécifique par son ID
 * @param {number} itemId - ID de la variété recherchée
 * @returns {IVariete | undefined} Variété correspondante ou undefined si non trouvée
 */
export const selectVarieteById = (itemId: number) =>
  createSelector(selectVarieteState, (state) =>
    state.varietes.find((item) => item.id === itemId),
  )

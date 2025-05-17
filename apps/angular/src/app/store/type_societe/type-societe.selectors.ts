import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ITypeSocieteState } from './type-societe.model'

/**
 * Sélecteur de base pour accéder à l'état des types de sociétés
 */
export const selectTypeSocieteState = 
  createFeatureSelector<ITypeSocieteState>('typeSociete')

/**
 * Sélecteurs dérivés pour les différentes parties de l'état
 */

/**
 * Sélecteur pour obtenir la liste complète des types de sociétés
 * @returns {ITypeSociete[]} Liste des types de sociétés
 */
export const selectTypeSocietesList = createSelector(
  selectTypeSocieteState,
  (state) => state.typeSocietes
)

/**
 * Sélecteur pour obtenir l'état de chargement
 * @returns {boolean} État de chargement
 */
export const selectTypeSocieteIsLoading = createSelector(
  selectTypeSocieteState,
  (state) => state.isLoading
)

/**
 * Sélecteur pour obtenir un type de société spécifique par son ID
 * @param {number} itemId - ID du type de société recherché
 * @returns {ITypeSociete | undefined} Type de société correspondant ou undefined si non trouvé
 */
export const selectTypeSocieteById = (itemId: number) => createSelector(
  selectTypeSocieteState,
  (state) => state.typeSocietes.find(item => item.id === itemId)
)

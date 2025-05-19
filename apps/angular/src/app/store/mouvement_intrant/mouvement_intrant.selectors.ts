import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IMouvementIntrantState } from './mouvement_intrant.model'

/**
 * Sélecteur de base pour l'état des mouvements d'intrants
 */
export const selectMouvementIntrantState =
  createFeatureSelector<IMouvementIntrantState>('mouvementIntrant')

/**
 * Sélecteurs dérivés pour les différentes parties de l'état
 */

/**
 * Sélecteur pour obtenir la liste complète des mouvements d'intrants
 */
export const selectMouvementIntrantsList = createSelector(
  selectMouvementIntrantState,
  (state) => state.mouvementIntrants,
)

/**
 * Sélecteur pour obtenir la liste des mouvements d'intrants filtrés
 */
export const selectMouvementIntrantWithFiltersList = createSelector(
  selectMouvementIntrantState,
  (state) => state.mouvementIntrantWithFilters,
)

/**
 * Sélecteur pour obtenir l'état de chargement
 */
export const selectMouvementIntrantIsLoading = createSelector(
  selectMouvementIntrantState,
  (state) => state.isLoading,
)

/**
 * Sélecteur pour obtenir un mouvement d'intrant par son ID
 * @param itemId - ID du mouvement d'intrant à rechercher
 */
export const selectMouvementIntrantById = (itemId: number) =>
  createSelector(selectMouvementIntrantState, (state) =>
    state.mouvementIntrants.find((item) => item.id === itemId),
  )

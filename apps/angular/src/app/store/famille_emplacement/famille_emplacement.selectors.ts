import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IFamilleEmplacementState } from './famille_emplacement.model'

/**
 * Sélecteur de base pour l'état des familles d'emplacements
 */
export const selectFamilleEmplacementState = createFeatureSelector<IFamilleEmplacementState>('familleEmplacement')

/**
 * Sélecteur pour obtenir la liste complète des familles d'emplacements
 */
export const selectFamilleEmplacementsList = createSelector(
  selectFamilleEmplacementState,
  (state) => state.familleEmplacements
)

/**
 * Sélecteur pour obtenir l'état de chargement
 */
export const selectFamilleEmplacementIsLoading = createSelector(
  selectFamilleEmplacementState,
  (state) => state.isLoading
)

/**
 * Sélecteur pour obtenir une famille d'emplacement par son ID
 * @param itemId - ID de la famille d'emplacement à rechercher
 */
export const selectFamilleEmplacementById = (itemId: number) => createSelector(
  selectFamilleEmplacementState,
  (state) => state.familleEmplacements.find((item) => item.id === itemId)
)

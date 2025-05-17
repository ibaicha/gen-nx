import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IPointAgenceState } from './point_agence.model'

/**
 * Sélecteur de base pour l'état des points d'agence
 */
export const selectPointAgenceState =
  createFeatureSelector<IPointAgenceState>('pointAgence')

/**
 * Sélecteurs dérivés pour les différentes parties de l'état
 */

/**
 * Sélecteur pour obtenir la liste complète des points d'agence
 */
export const selectPointAgencesList = createSelector(
  selectPointAgenceState,
  (state) => state.pointAgences,
)

/**
 * Sélecteur pour obtenir l'état de chargement
 */
export const selectPointAgenceIsLoading = createSelector(
  selectPointAgenceState,
  (state) => state.isLoading,
)

/**
 * Sélecteur pour obtenir un point d'agence par son ID
 * @param itemId - ID du point d'agence à rechercher
 */
export const selectPointAgenceById = (itemId: number) =>
  createSelector(selectPointAgenceState, (state) =>
    state.pointAgences?.find((item) => item.id === itemId),
  )

/**
 * Sélecteur pour obtenir la liste des points d'une agence spécifique
 * @param id - ID de l'agence
 */
export const selectPointCustomListFromAgence = (id: number) =>
  createSelector(
    selectPointAgenceState,
    (state) =>
      state?.pointAgences?.filter((point) => point.agenceId === id) || [],
  )

/**
 * Sélecteur pour obtenir la liste des points d'une société spécifique
 * @param id - ID de la société
 */
export const selectPointCustomListFromAgenceFromSociete = (id: number) =>
  createSelector(
    selectPointAgenceState,
    (state) =>
      state?.pointAgences?.filter((point) => point.agence?.societeId === id) ||
      [],
  )

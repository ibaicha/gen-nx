import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ICampagneState } from './campagne.model'

/**
 * Sélecteur de base pour l'état des campagnes
 */
export const selectCampagneState = createFeatureSelector<ICampagneState>('campagne')

/**
 * Sélecteur pour obtenir la liste des campagnes
 */
export const selectCampagnesList = createSelector(
  selectCampagneState,
  (state) => state.campagnes
)

/**
 * Sélecteur pour obtenir l'état de chargement
 */
export const selectCampagneIsLoading = createSelector(
  selectCampagneState,
  (state) => state.isLoading
)

/**
 * Sélecteur pour obtenir une campagne par son ID
 * @param itemId - ID de la campagne à rechercher
 */
export const selectCampagneById = (itemId: number) => createSelector(
  selectCampagneState,
  (state) => state.campagnes.find((item) => item.id === itemId)
)

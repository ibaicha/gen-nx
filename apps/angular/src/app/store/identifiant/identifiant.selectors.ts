import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IIdentifiantState } from './identifiant.model'

/**
 * Sélecteur de base pour l'état des identifiants
 */
export const selectIdentifiantState = createFeatureSelector<IIdentifiantState>('identifiant')

/**
 * Sélecteurs dérivés pour les différentes parties de l'état
 */

/**
 * Sélecteur pour obtenir la liste complète des identifiants
 */
export const selectIdentifiantsList = createSelector(
  selectIdentifiantState,
  (state) => state.identifiants
)

/**
 * Sélecteur pour obtenir la liste des identifiants filtrés
 */
export const selectIdentifiantWithFiltersList = createSelector(
  selectIdentifiantState,
  (state) => state.identifiantWithFilters
)

/**
 * Sélecteur pour obtenir l'état de chargement
 */
export const selectIdentifiantIsLoading = createSelector(
  selectIdentifiantState,
  (state) => state.isLoading
)

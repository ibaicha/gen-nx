import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IFormeJuridiqueState } from './forme-juridique.model'

/**
 * Sélecteur de base pour l'état des formeJuridiques
 */
export const selectFormeJuridiqueState =
  createFeatureSelector<IFormeJuridiqueState>('formeJuridique')

/**
 * Sélecteurs dérivés pour les différentes parties de l'état
 */

/**
 * Sélecteur pour obtenir la liste complète des formeJuridiques
 */
export const selectFormeJuridiquesList = createSelector(
  selectFormeJuridiqueState,
  (state) => state.formeJuridiques,
)

/**
 * Sélecteur pour obtenir l'état de chargement
 */
export const selectFormeJuridiqueIsLoading = createSelector(
  selectFormeJuridiqueState,
  (state) => state.isLoading,
)

/**
 * Sélecteur pour obtenir une formeJuridique par son ID
 * @param itemId - ID de la formeJuridique à rechercher
 */
export const selectFormeJuridiqueById = (itemId: number) =>
  createSelector(selectFormeJuridiqueState, (state) =>
    state.formeJuridiques.find((item) => item.id === itemId),
  )

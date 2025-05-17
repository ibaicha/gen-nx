// constante.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IConstanteState } from './constante.model'

export const selectConstanteState =
  createFeatureSelector<IConstanteState>('constante')

export const selectAnnees = createSelector(
  selectConstanteState,
  (state) => state.annees,
)
export const selectSaisons = createSelector(
  selectConstanteState,
  (state) => state.saisons,
)
export const selectCampagnes = createSelector(
  selectConstanteState,
  (state) => state.campagnes,
)
export const selectFormeJuridiques = createSelector(
  selectConstanteState,
  (state) => state.formeJuridiques,
)
export const selectLocalites = createSelector(
  selectConstanteState,
  (state) => state.localites,
)
export const selectVarietes = createSelector(
  selectConstanteState,
  (state) => state.varietes,
)
export const selectPoints = createSelector(
  selectConstanteState,
  (state) => state.points,
)

export const selectLoading = createSelector(
  selectConstanteState,
  (state) => state.isLoading,
)
export const selectError = createSelector(
  selectConstanteState,
  (state) => state.error,
)

import { Action, createReducer, on } from '@ngrx/store'
import { ISaisonState } from './saison.model'
import * as fromSaisons from './index'

/**
 * État initial du store des saisons
 */
export const initialSaisonState: ISaisonState = {
  saisons: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des saisons
 * Gère les différentes actions et leurs effets sur l'état
 */
const reducer = createReducer<ISaisonState>(
  initialSaisonState,

  // Actions de lecture
  on(fromSaisons.getSaison, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromSaisons.getSaisonSuccess, (state, { oneSaison }) => ({
    ...state,
    isLoading: false,
    oneSaison,
  })),

  on(fromSaisons.getSaisons, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromSaisons.getSaisonsSuccess, (state, { saisons }) => ({
    ...state,
    isLoading: false,
    saisons,
  })),

  // Actions de création
  on(fromSaisons.createSaison, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromSaisons.createSaisonSuccess, (state, { saison }) => ({
    ...state,
    saisons: [...state.saisons, saison],
    isLoading: false,
  })),

  // Actions de mise à jour
  on(fromSaisons.updateSaison, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromSaisons.updateSaisonSuccess, (state, { saison }) => ({
    ...state,
    saisons: state.saisons.map((item) =>
      item.id === saison.id ? saison : item,
    ),
    isLoading: false,
  })),

  // Actions de suppression
  on(fromSaisons.deleteSaison, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromSaisons.deleteSaisonSuccess, (state, { saison }) => ({
    ...state,
    saisons: state.saisons.filter((item) => item.id !== saison.id),
    isLoading: false,
  })),
)

/**
 * Fonction reducer exportée pour être utilisée par le store
 */
export function saisonReducer(
  state = initialSaisonState,
  actions: Action,
): ISaisonState {
  return reducer(state, actions)
}

import { Action, createReducer, on } from '@ngrx/store'
import { IAgenceState } from './agence.model'
import * as fromAgences from './index'

/**
 * État initial du store des sociétés
 */
export const initialAgenceState: IAgenceState = {
  agences: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des sociétés
 * Gère les différentes actions et leurs effets sur l'état
 */
const reducer = createReducer<IAgenceState>(
  initialAgenceState,

  // ===== Actions de lecture =====

  /**
   * Gestion des actions de récupération d'une société
   */
  on(fromAgences.getAgence, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromAgences.getAgenceSuccess, (state, { oneAgence }) => ({
    ...state,
    isLoading: false,
    oneAgence,
  })),

  /**
   * Gestion des actions de récupération de toutes les sociétés
   */
  on(fromAgences.getAgences, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromAgences.getAgencesSuccess, (state, { agences }) => ({
    ...state,
    isLoading: false,
    agences,
  })),

  // ===== Actions de modification =====

  /**
   * Gestion des actions de création d'une société
   */
  on(fromAgences.createAgence, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromAgences.createAgenceSuccess, (state, { agence }) => ({
    ...state,
    agences: [...state.agences, agence],
    isLoading: false,
  })),

  /**
   * Gestion des actions de mise à jour d'une société
   */
  on(fromAgences.updateAgence, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromAgences.updateAgenceSuccess, (state, { agence }) => ({
    ...state,
    agences: state.agences.map((item) =>
      item.id === agence.id ? agence : item,
    ),
    isLoading: false,
  })),

  /**
   * Gestion des actions de suppression d'une société
   */
  on(fromAgences.deleteAgence, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromAgences.deleteAgenceSuccess, (state, { agence }) => ({
    ...state,
    agences: state.agences.filter((item) => item.id !== agence.id),
    isLoading: false,
  })),
)

/**
 * Fonction reducer exportée pour être utilisée par le store
 */
export function agenceReducer(
  state = initialAgenceState,
  actions: Action,
): IAgenceState {
  return reducer(state, actions)
}

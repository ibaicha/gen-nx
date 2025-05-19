import { Action, createReducer, on } from '@ngrx/store'
import { ISocieteState } from './societe.model'
import * as fromSocietes from './index'

/**
 * État initial du store des sociétés
 */
export const initialSocieteState: ISocieteState = {
  societes: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des sociétés
 * Gère les différentes actions et leurs effets sur l'état
 */
const reducer = createReducer<ISocieteState>(
  initialSocieteState,

  // ===== Actions de lecture =====

  /**
   * Gestion des actions de récupération d'une société
   */
  on(fromSocietes.getSociete, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromSocietes.getSocieteSuccess, (state, { oneSociete }) => ({
    ...state,
    isLoading: false,
    oneSociete,
  })),

  /**
   * Gestion des actions de récupération de toutes les sociétés
   */
  on(fromSocietes.getSocietes, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromSocietes.getSocietesSuccess, (state, { societes }) => ({
    ...state,
    isLoading: false,
    societes,
  })),

  // ===== Actions de modification =====

  /**
   * Gestion des actions de création d'une société
   */
  on(fromSocietes.createSociete, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromSocietes.createSocieteSuccess, (state, { societe }) => ({
    ...state,
    societes: [...state.societes, societe],
    isLoading: false,
  })),

  /**
   * Gestion des actions de mise à jour d'une société
   */
  on(fromSocietes.updateSociete, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromSocietes.updateSocieteSuccess, (state, { societe }) => ({
    ...state,
    societes: state.societes.map((item) =>
      item.id === societe.id ? societe : item,
    ),
    isLoading: false,
  })),

  /**
   * Gestion des actions de suppression d'une société
   */
  on(fromSocietes.deleteSociete, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromSocietes.deleteSocieteSuccess, (state, { societe }) => ({
    ...state,
    societes: state.societes.filter((item) => item.id !== societe.id),
    isLoading: false,
  })),
)

/**
 * Fonction reducer exportée pour être utilisée par le store
 */
export function societeReducer(
  state = initialSocieteState,
  actions: Action,
): ISocieteState {
  return reducer(state, actions)
}

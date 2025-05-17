import { Action, createReducer, on } from '@ngrx/store'

import * as fromAgenceOps from './index'
import { IAgenceOpState } from './agence_op.model'

/**
 * État initial du reducer des crédits
 */
export const initialAgenceOpState: IAgenceOpState = {
  agenceOps: [],
  creditsAgencesWithFilters: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des crédits
 */
const reducer = createReducer<IAgenceOpState>(
  initialAgenceOpState,

  /**
   * Gestion des actions de récupération des crédits standards
   */
  on(fromAgenceOps.getAgenceOp, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromAgenceOps.getAgenceOpSuccess, (state, { oneAgenceOp }) => ({
    ...state,
    isLoading: false,
    oneAgenceOp,
  })),

  on(fromAgenceOps.getAgenceOps, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromAgenceOps.getAgenceOpsSuccess, (state, { agenceOps }) => ({
    ...state,
    isLoading: false,
    agenceOps,
  })),
  /**
   * Gestion des actions de récupération avec filtres
   */
  on(fromAgenceOps.getCreditsAgencesWithFilters, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(
    fromAgenceOps.getCreditsAgencesWithFiltersSuccess,
    (state, { creditsAgencesWithFilters }) => ({
      ...state,
      creditsAgencesWithFilters,
      isLoading: false,
    }),
  ),

  on(fromAgenceOps.getCreditsAgencesWithFiltersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  /**
   * Gestion des actions CRUD standards
   */
  on(fromAgenceOps.createAgenceOp, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromAgenceOps.createAgenceOpSuccess, (state, { agenceOp }) => ({
    ...state,
    agenceOps: [...state.agenceOps, agenceOp],
    isLoading: false,
  })),

  on(fromAgenceOps.updateAgenceOp, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromAgenceOps.updateAgenceOpSuccess, (state, { agenceOp }) => ({
    ...state,
    agenceOps: state.agenceOps.map((b) =>
      b.id === agenceOp.id ? agenceOp : b,
    ),
    isLoading: false,
  })),

  on(fromAgenceOps.deleteAgenceOp, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromAgenceOps.deleteAgenceOpSuccess, (state, { agenceOp }) => ({
    ...state,
    isLoading: false,
    agenceOps: state.agenceOps.filter((b) => b.id !== agenceOp.id),
  })),
)

/**
 * Fonction reducer exportée pour la gestion de l'état des crédits
 */
export function agenceOpReducer(
  state = initialAgenceOpState,
  actions: Action,
): IAgenceOpState {
  return reducer(state, actions)
}

import { Action, createReducer, on } from '@ngrx/store'
import { IOpState } from './op.model'
import * as fromOps from './index'

/**
 * État initial du reducer des opérations
 */
export const initialOpState: IOpState = {
  ops: [],
  opsPortefeuilles: [],
  opsCustomFromAgences: [],
  opsWithFilters: [],
  isLoading: false,
  error: null,
}

/**
 * Reducer principal pour la gestion des opérations
 */
const reducer = createReducer<IOpState>(
  initialOpState,

  /**
   * Gestion des actions de récupération d'une opération
   */
  on(fromOps.getOp, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromOps.getOpSuccess, (state, { oneOp }) => ({
    ...state,
    isLoading: false,
    oneOp,
  })),

  /**
   * Gestion des actions de récupération de toutes les opérations
   */
  on(fromOps.getOps, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromOps.getOpsSuccess, (state, { ops }) => ({
    ...state,
    isLoading: false,
    ops,
  })),

  /**
   * Gestion des actions de récupération des opérations personnalisées par agence
   */
  on(fromOps.getAllOpsCustomFromAgence, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromOps.getAllOpsCustomFromAgenceSuccess,
    (state, { opsCustomFromAgences }) => ({
      ...state,
      isLoading: false,
      opsCustomFromAgences,
    }),
  ),

  /**
   * Gestion des actions de récupération avec filtres
   */
  on(fromOps.getOpsWithFilters, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(fromOps.getOpsWithFiltersSuccess, (state, { opsWithFilters }) => ({
    ...state,
    opsWithFilters,
    isLoading: false,
  })),

  on(fromOps.getOpsWithFiltersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  /**
   * Gestion des actions de création d'une opération
   */
  on(fromOps.createOp, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromOps.createOpSuccess, (state, { op }) => ({
    ...state,
    ops: [...state.ops, op],
    isLoading: false,
  })),

  /**
   * Gestion des actions de création d'une opération avec un portefeuille
   */
  on(fromOps.createOpPortefeuille, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromOps.createOpPortefeuilleSuccess, (state, { opPortefeuille }) => ({
    ...state,
    opsPortefeuilles: [...state.opsPortefeuilles, opPortefeuille],
    isLoading: false,
  })),

  /**
   * Gestion des actions de mise à jour d'une opération
   */
  on(fromOps.updateOp, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromOps.updateOpSuccess, (state, { op }) => ({
    ...state,
    ops: state.ops.map((b) => (b.id === op.id ? op : b)),
    isLoading: false,
  })),

  /**
   * Gestion des actions de suppression d'une opération
   */
  on(fromOps.deleteOp, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromOps.deleteOpSuccess, (state, { op }) => ({
    ...state,
    isLoading: false,
    ops: state.ops.filter((b) => b.id !== op.id),
  })),
)

/**
 * Fonction reducer exportée pour la gestion des opérations
 */
export function opReducer(state = initialOpState, actions: Action): IOpState {
  return reducer(state, actions)
}

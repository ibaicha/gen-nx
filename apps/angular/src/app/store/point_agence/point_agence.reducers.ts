import { Action, createReducer, on } from '@ngrx/store'
import { IPointAgenceState } from './point_agence.model'
import * as fromPointAgences from './index'

/**
 * État initial du reducer des points d'agence
 */
export const initialPointAgenceState: IPointAgenceState = {
  pointAgences: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des points d'agence
 */
const reducer = createReducer<IPointAgenceState>(
  initialPointAgenceState,

  /**
   * Gestion des actions de récupération d'un point d'agence
   */
  on(fromPointAgences.getPointAgence, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromPointAgences.getPointAgenceSuccess, (state, { onePointAgence }) => ({
    ...state,
    isLoading: false,
    onePointAgence,
  })),

  /**
   * Gestion des actions de récupération de tous les points d'agence
   */
  on(fromPointAgences.getPointAgences, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromPointAgences.getPointAgencesSuccess, (state, { pointAgences }) => ({
    ...state,
    isLoading: false,
    pointAgences,
  })),

  /**
   * Gestion des actions de création d'un point d'agence
   */
  on(fromPointAgences.createPointAgence, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromPointAgences.createPointAgenceSuccess, (state, { pointAgence }) => ({
    ...state,
    pointAgences: [...state.pointAgences, pointAgence],
    isLoading: false,
  })),

  /**
   * Gestion des actions de mise à jour d'un point d'agence
   */
  on(fromPointAgences.updatePointAgence, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromPointAgences.updatePointAgenceSuccess, (state, { pointAgence }) => ({
    ...state,
    pointAgences: state.pointAgences.map((item) =>
      item.id === pointAgence.id ? pointAgence : item,
    ),
    isLoading: false,
  })),

  /**
   * Gestion des actions de suppression d'un point d'agence
   */
  on(fromPointAgences.deletePointAgence, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromPointAgences.deletePointAgenceSuccess, (state, { pointAgence }) => ({
    ...state,
    pointAgences: state.pointAgences.filter(
      (item) => item.id !== pointAgence.id,
    ),
    isLoading: false,
  })),
)

/**
 * Fonction reducer exportée pour la gestion des points d'agence
 */
export function pointAgenceReducer(
  state = initialPointAgenceState,
  actions: Action,
): IPointAgenceState {
  return reducer(state, actions)
}

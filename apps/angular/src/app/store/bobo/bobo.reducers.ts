import { Action, createReducer, on } from '@ngrx/store'
import { IBoboState } from './bobo.model'
import * as fromBobos from './index'

/**
 * État initial du store des bobos
 */
export const initialBoboState: IBoboState = {
  bobos: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des bobos
 * Gère les différentes actions et leurs effets sur l'état
 */
const reducer = createReducer<IBoboState>(
  initialBoboState,

  // ===== Actions de lecture =====

  /**
   * Gestion des actions de récupération d'un bobo
   */
  on(fromBobos.getBobo, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromBobos.getBoboSuccess, (state, { oneBobo }) => ({
    ...state,
    isLoading: false,
    oneBobo,
  })),

  /**
   * Gestion des actions de récupération de tous les bobos
   */
  on(fromBobos.getBobos, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromBobos.getBobosSuccess, (state, { bobos }) => ({
    ...state,
    isLoading: false,
    bobos,
  })),

  // ===== Actions de modification =====

  /**
   * Gestion des actions de création d'un bobo
   */
  on(fromBobos.createBobo, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromBobos.createBoboSuccess, (state, { bobo }) => ({
    ...state,
    bobos: [...state.bobos, bobo],
    isLoading: false,
  })),

  /**
   * Gestion des actions de mise à jour d'un bobo
   */
  on(fromBobos.updateBobo, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromBobos.updateBoboSuccess, (state, { bobo }) => ({
    ...state,
    bobos: state.bobos.map((item) => (item.id === bobo.id ? bobo : item)),
    isLoading: false,
  })),

  /**
   * Gestion des actions de suppression d'un bobo
   */
  on(fromBobos.deleteBobo, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromBobos.deleteBoboSuccess, (state, { bobo }) => ({
    ...state,
    bobos: state.bobos.filter((item) => item.id !== bobo.id),
    isLoading: false,
  })),
)

/**
 * Fonction exportée du reducer
 */
export function boboReducer(state: IBoboState | undefined, action: Action) {
  return reducer(state, action)
}

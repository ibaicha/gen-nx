import { Action, createReducer, on } from '@ngrx/store'
import { IVarieteState } from './variete.model'
import * as fromVarietes from './index'

/**
 * État initial du store des variétés
 */
export const initialVarieteState: IVarieteState = {
  varietes: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des variétés
 * Gère les différentes actions et leurs effets sur l'état
 */
const reducer = createReducer<IVarieteState>(
  initialVarieteState,

  // ===== Actions de lecture =====

  /**
   * Gestion des actions de récupération d'une variété
   */
  on(fromVarietes.getVariete, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromVarietes.getVarieteSuccess, (state, { oneVariete }) => ({
    ...state,
    isLoading: false,
    oneVariete,
  })),

  /**
   * Gestion des actions de récupération de toutes les variétés
   */
  on(fromVarietes.getVarietes, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromVarietes.getVarietesSuccess, (state, { varietes }) => ({
    ...state,
    isLoading: false,
    varietes,
  })),

  // ===== Actions de modification =====

  /**
   * Gestion des actions de création d'une variété
   */
  on(fromVarietes.createVariete, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromVarietes.createVarieteSuccess, (state, { variete }) => ({
    ...state,
    varietes: [...state.varietes, variete],
    isLoading: false,
  })),

  /**
   * Gestion des actions de mise à jour d'une variété
   */
  on(fromVarietes.updateVariete, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromVarietes.updateVarieteSuccess, (state, { variete }) => ({
    ...state,
    varietes: state.varietes.map((item) =>
      item.id === variete.id ? variete : item,
    ),
    isLoading: false,
  })),

  /**
   * Gestion des actions de suppression d'une variété
   */
  on(fromVarietes.deleteVariete, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromVarietes.deleteVarieteSuccess, (state, { variete }) => ({
    ...state,
    varietes: state.varietes.filter((item) => item.id !== variete.id),
    isLoading: false,
  })),
)

/**
 * Fonction reducer exportée pour être utilisée par le store
 * @param state - État actuel, utilise initialVarieteState par défaut
 * @param actions - Action à traiter
 * @returns Nouvel état après application de l'action
 */
export function varieteReducer(
  state = initialVarieteState,
  actions: Action,
): IVarieteState {
  return reducer(state, actions)
}

import { Action, createReducer, on } from '@ngrx/store'
import { ITypeSocieteState } from './type-societe.model'
import * as fromTypeSocietes from './index'

/**
 * État initial du store des types de sociétés
 */
export const initialTypeSocieteState: ITypeSocieteState = {
  typeSocietes: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des types de sociétés
 * Gère les différentes actions et leurs effets sur l'état
 */
const reducer = createReducer<ITypeSocieteState>(
  initialTypeSocieteState,

  // ===== Actions de lecture =====

  /**
   * Gestion des actions de récupération d'un type de société
   */
  on(fromTypeSocietes.getTypeSociete, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromTypeSocietes.getTypeSocieteSuccess, (state, { oneTypeSociete }) => ({
    ...state,
    isLoading: false,
    oneTypeSociete,
  })),

  /**
   * Gestion des actions de récupération de tous les types de sociétés
   */
  on(fromTypeSocietes.getTypeSocietes, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromTypeSocietes.getTypeSocietesSuccess, (state, { typeSocietes }) => ({
    ...state,
    isLoading: false,
    typeSocietes,
  })),

  // ===== Actions de modification =====

  /**
   * Gestion des actions de création d'un type de société
   */
  on(fromTypeSocietes.createTypeSociete, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromTypeSocietes.createTypeSocieteSuccess, (state, { typeSociete }) => ({
    ...state,
    typeSocietes: [...state.typeSocietes, typeSociete],
    isLoading: false,
  })),

  /**
   * Gestion des actions de mise à jour d'un type de société
   */
  on(fromTypeSocietes.updateTypeSociete, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromTypeSocietes.updateTypeSocieteSuccess, (state, { typeSociete }) => ({
    ...state,
    typeSocietes: state.typeSocietes.map((item) =>
      item.id === typeSociete.id ? typeSociete : item
    ),
    isLoading: false,
  })),

  /**
   * Gestion des actions de suppression d'un type de société
   */
  on(fromTypeSocietes.deleteTypeSociete, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromTypeSocietes.deleteTypeSocieteSuccess, (state, { typeSociete }) => ({
    ...state,
    typeSocietes: state.typeSocietes.filter((item) => item.id !== typeSociete.id),
    isLoading: false,
  }))
)

/**
 * Fonction reducer exportée pour être utilisée par le store
 */
export function typeSocieteReducer(
  state = initialTypeSocieteState,
  actions: Action
): ITypeSocieteState {
  return reducer(state, actions)
}

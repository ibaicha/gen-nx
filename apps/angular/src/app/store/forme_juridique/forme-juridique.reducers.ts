import { Action, createReducer, on } from '@ngrx/store'
import { IFormeJuridiqueState } from './forme-juridique.model'
import * as fromFormeJuridiques from './index'

/**
 * État initial du store des formeJuridiques
 */
export const initialFormeJuridiqueState: IFormeJuridiqueState = {
  formeJuridiques: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des formeJuridiques
 * Gère les différentes actions et leurs effets sur l'état
 */
const reducer = createReducer<IFormeJuridiqueState>(
  initialFormeJuridiqueState,

  // Actions de lecture
  on(fromFormeJuridiques.getFormeJuridique, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromFormeJuridiques.getFormeJuridiqueSuccess, (state, { oneFormeJuridique }) => ({
    ...state,
    isLoading: false,
    oneFormeJuridique,
  })),

  on(fromFormeJuridiques.getFormeJuridiques, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromFormeJuridiques.getFormeJuridiquesSuccess, (state, { formeJuridiques }) => ({
    ...state,
    isLoading: false,
    formeJuridiques,
  })),

  // Actions de création
  on(fromFormeJuridiques.createFormeJuridique, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromFormeJuridiques.createFormeJuridiqueSuccess, (state, { formeJuridique }) => ({
    ...state,
    formeJuridiques: [...state.formeJuridiques, formeJuridique],
    isLoading: false,
  })),

  // Actions de mise à jour
  on(fromFormeJuridiques.updateFormeJuridique, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromFormeJuridiques.updateFormeJuridiqueSuccess, (state, { formeJuridique }) => ({
    ...state,
    formeJuridiques: state.formeJuridiques.map((item) =>
      item.id === formeJuridique.id ? formeJuridique : item,
    ),
    isLoading: false,
  })),

  // Actions de suppression
  on(fromFormeJuridiques.deleteFormeJuridique, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromFormeJuridiques.deleteFormeJuridiqueSuccess, (state, { formeJuridique }) => ({
    ...state,
    formeJuridiques: state.formeJuridiques.filter((item) => item.id !== formeJuridique.id),
    isLoading: false,
  })),
)

/**
 * Fonction reducer exportée pour être utilisée par le store
 */
export function formeJuridiqueReducer(
  state = initialFormeJuridiqueState,
  actions: Action,
): IFormeJuridiqueState {
  return reducer(state, actions)
}

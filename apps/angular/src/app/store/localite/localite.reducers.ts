import { Action, createReducer, on } from '@ngrx/store'
import { ILocaliteState } from './localite.model'
import * as fromLocalites from './index'

/**
 * État initial du store des localites
 */
export const initialLocaliteState: ILocaliteState = {
  localites: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des localites
 * Gère les différentes actions et leurs effets sur l'état
 */
const reducer = createReducer<ILocaliteState>(
  initialLocaliteState,

  // Actions de lecture
  on(fromLocalites.getLocalite, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromLocalites.getLocaliteSuccess, (state, { oneLocalite }) => ({
    ...state,
    isLoading: false,
    oneLocalite,
  })),

  on(fromLocalites.getLocalites, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromLocalites.getLocalitesSuccess, (state, { localites }) => ({
    ...state,
    isLoading: false,
    localites,
  })),

  // Actions de création
  on(fromLocalites.createLocalite, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromLocalites.createLocaliteSuccess, (state, { localite }) => ({
    ...state,
    localites: [...state.localites, localite],
    isLoading: false,
  })),

  // Actions de mise à jour
  on(fromLocalites.updateLocalite, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromLocalites.updateLocaliteSuccess, (state, { localite }) => ({
    ...state,
    localites: state.localites.map((item) =>
      item.id === localite.id ? localite : item,
    ),
    isLoading: false,
  })),

  // Actions de suppression
  on(fromLocalites.deleteLocalite, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromLocalites.deleteLocaliteSuccess, (state, { localite }) => ({
    ...state,
    localites: state.localites.filter((item) => item.id !== localite.id),
    isLoading: false,
  })),
)

/**
 * Fonction reducer exportée pour être utilisée par le store
 */
export function localiteReducer(
  state = initialLocaliteState,
  actions: Action,
): ILocaliteState {
  return reducer(state, actions)
}

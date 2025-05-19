import { Action, createReducer, on } from '@ngrx/store'
import * as fromIdentifiants from './index'
import { IIdentifiantState } from './identifiant.model'

/**
 * État initial du reducer des identifiants
 */
export const initialIdentifiantState: IIdentifiantState = {
  identifiants: [],
  identifiantWithFilters: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des identifiants
 */
const reducer = createReducer<IIdentifiantState>(
  initialIdentifiantState,

  /**
   * Gestion des actions de récupération d'un identifiant
   */
  on(fromIdentifiants.getIdentifiant, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromIdentifiants.getIdentifiantSuccess, (state, { oneIdentifiant }) => ({
    ...state,
    isLoading: false,
    oneIdentifiant,
  })),

  /**
   * Gestion des actions de récupération de tous les identifiants
   */
  on(fromIdentifiants.getIdentifiants, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromIdentifiants.getIdentifiantsSuccess, (state, { identifiants }) => ({
    ...state,
    isLoading: false,
    identifiants,
  })),

  /**
   * Gestion des actions de récupération filtrée des identifiants
   */
  on(fromIdentifiants.getAllIdentifiantsWithFilters, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromIdentifiants.getAllIdentifiantsWithFiltersSuccess,
    (state, { identifiantWithFilters }) => ({
      ...state,
      isLoading: false,
      identifiantWithFilters,
    }),
  ),

  /**
   * Gestion des actions de création d'un identifiant
   */
  on(fromIdentifiants.createIdentifiant, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromIdentifiants.createIdentifiantSuccess, (state, { identifiant }) => ({
    ...state,
    identifiants: [...state.identifiants, identifiant],
    isLoading: false,
  })),

  /**
   * Gestion des actions de mise à jour d'un identifiant
   */
  on(fromIdentifiants.updateIdentifiant, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromIdentifiants.updateIdentifiantSuccess, (state, { identifiant }) => ({
    ...state,
    identifiants: state.identifiants.map((item) =>
      item.id === identifiant.id ? identifiant : item,
    ),
    isLoading: false,
  })),

  /**
   * Gestion des actions de suppression d'un identifiant
   */
  on(fromIdentifiants.deleteIdentifiant, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromIdentifiants.deleteIdentifiantSuccess, (state, { identifiant }) => ({
    ...state,
    identifiants: state.identifiants.filter(
      (item) => item.id !== identifiant.id,
    ),
    isLoading: false,
  })),
)

/**
 * Fonction reducer exportée pour la gestion de l'état des identifiants
 */
export function identifiantReducer(
  state = initialIdentifiantState,
  actions: Action,
): IIdentifiantState {
  return reducer(state, actions)
}

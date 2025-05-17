import { Action, createReducer, on } from '@ngrx/store'

import * as fromCreditAgences from './index'
import { ICreditAgenceState } from './credit_agence.model'

/**
 * État initial du reducer des crédits
 */
export const initialCreditAgenceState: ICreditAgenceState = {
  creditAgences: [],
  creditsAgencesWithFilters: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des crédits
 */
const reducer = createReducer<ICreditAgenceState>(
  initialCreditAgenceState,

  /**
   * Gestion des actions de récupération des crédits standards
   */
  on(fromCreditAgences.getCreditAgence, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromCreditAgences.getCreditAgenceSuccess,
    (state, { oneCreditAgence }) => ({
      ...state,
      isLoading: false,
      oneCreditAgence,
    }),
  ),

  on(fromCreditAgences.getCreditAgences, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromCreditAgences.getCreditAgencesSuccess, (state, { creditAgences }) => ({
    ...state,
    isLoading: false,
    creditAgences,
  })),
  /**
   * Gestion des actions de récupération avec filtres
   */
  on(fromCreditAgences.getCreditsAgencesWithFilters, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(
    fromCreditAgences.getCreditsAgencesWithFiltersSuccess,
    (state, { creditsAgencesWithFilters }) => ({
      ...state,
      creditsAgencesWithFilters,
      isLoading: false,
    }),
  ),

  on(
    fromCreditAgences.getCreditsAgencesWithFiltersFailure,
    (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    }),
  ),
  /**
   * Gestion des actions CRUD standards
   */
  on(fromCreditAgences.createCreditAgence, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromCreditAgences.createCreditAgenceSuccess,
    (state, { creditAgence }) => ({
      ...state,
      creditAgences: [...state.creditAgences, creditAgence],
      isLoading: false,
    }),
  ),

  on(fromCreditAgences.updateCreditAgence, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromCreditAgences.updateCreditAgenceSuccess,
    (state, { creditAgence }) => ({
      ...state,
      creditAgences: state.creditAgences.map((b) =>
        b.id === creditAgence.id ? creditAgence : b,
      ),
      isLoading: false,
    }),
  ),

  on(fromCreditAgences.deleteCreditAgence, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromCreditAgences.deleteCreditAgenceSuccess,
    (state, { creditAgence }) => ({
      ...state,
      isLoading: false,
      creditAgences: state.creditAgences.filter(
        (b) => b.id !== creditAgence.id,
      ),
    }),
  ),
)

/**
 * Fonction reducer exportée pour la gestion de l'état des crédits
 */
export function creditAgenceReducer(
  state = initialCreditAgenceState,
  actions: Action,
): ICreditAgenceState {
  return reducer(state, actions)
}

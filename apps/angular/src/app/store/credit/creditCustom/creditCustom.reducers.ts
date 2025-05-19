import { Action, createReducer, on } from '@ngrx/store'
import { ICreditCustomState } from './creditCustom.model'
import * as fromCreditCustoms from './index'

/**
 * État initial du reducer des crédits personnalisés
 */
export const initialCreditCustomState: ICreditCustomState = {
  creditCustoms: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des crédits personnalisés
 */
const reducer = createReducer<ICreditCustomState>(
  initialCreditCustomState,

  /**
   * Gestion des actions de récupération d'un crédit personnalisé
   */
  on(fromCreditCustoms.getCreditCustom, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromCreditCustoms.getCreditCustomSuccess,
    (state, { oneCreditCustom }) => ({
      ...state,
      isLoading: false,
      oneCreditCustom,
    }),
  ),

  /**
   * Gestion des actions de récupération de tous les crédits personnalisés
   */
  on(fromCreditCustoms.getCreditCustoms, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromCreditCustoms.getCreditCustomsSuccess, (state, { creditCustoms }) => ({
    ...state,
    isLoading: false,
    creditCustoms,
  })),
)

/**
 * Fonction reducer exportée pour la gestion des crédits personnalisés
 */
export function creditCustomReducer(
  state = initialCreditCustomState,
  actions: Action,
): ICreditCustomState {
  return reducer(state, actions)
}

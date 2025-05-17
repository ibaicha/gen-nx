// constante.reducer.ts
import { createReducer, on } from '@ngrx/store'
import * as ConstanteActions from './constante.actions'
import { IConstanteState } from './constante.model'

/**
 * État initial du reducer des constantes
 */

export const initialState: IConstanteState = {
  annees: [],
  saisons: [],
  campagnes: [],
  formeJuridiques: [],
  localites: [],
  varietes: [],
  points: [],
  isLoading: false,
  error: null,
}

export const constanteReducer = createReducer(
  initialState,
  on(ConstanteActions.loadConstante, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(ConstanteActions.loadConstanteSuccess, (state, { annees, saisons, campagnes, formeJuridiques, localites, varietes, points }) => ({
    ...state,
    annees,
    saisons,
    campagnes,
    formeJuridiques,
    localites,
    varietes,
    points,
    isLoading: false,
  })),
  on(ConstanteActions.loadConstanteFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
)

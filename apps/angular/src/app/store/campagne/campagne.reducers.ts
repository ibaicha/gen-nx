import { Action, createReducer, on } from '@ngrx/store'
import { ICampagneState } from './campagne.model'
import * as fromCampagnes from './index'

/**
 * État initial du reducer des campagnes
 */
export const initialCampagneState: ICampagneState = {
  campagnes: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des campagnes
 */
const reducer = createReducer<ICampagneState>(
  initialCampagneState,

  /**
   * Gestion des actions de récupération
   */
  on(fromCampagnes.getCampagne, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromCampagnes.getCampagneSuccess, (state, { oneCampagne }) => ({
    ...state,
    isLoading: false,
    oneCampagne,
  })),

  on(fromCampagnes.getCampagnes, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromCampagnes.getCampagnesSuccess, (state, { campagnes }) => ({
    ...state,
    isLoading: false,
    campagnes,
  })),

  /**
   * Gestion des actions de création
   */
  on(fromCampagnes.createCampagne, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromCampagnes.createCampagneSuccess, (state, { campagne }) => ({
    ...state,
    campagnes: [...state.campagnes, campagne],
    isLoading: false,
  })),

  /**
   * Gestion des actions de mise à jour
   */
  on(fromCampagnes.updateCampagne, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromCampagnes.updateCampagneSuccess, (state, { campagne }) => ({
    ...state,
    campagnes: state.campagnes.map((item) =>
      item.id === campagne.id ? campagne : item,
    ),
    isLoading: false,
  })),

  /**
   * Gestion des actions de suppression
   */
  on(fromCampagnes.deleteCampagne, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromCampagnes.deleteCampagneSuccess, (state, { campagne }) => ({
    ...state,
    campagnes: state.campagnes.filter((item) => item.id !== campagne.id),
    isLoading: false,
  })),
)

/**
 * Fonction reducer exportée pour la gestion de l'état des campagnes
 */
export function campagneReducer(
  state = initialCampagneState,
  actions: Action,
): ICampagneState {
  return reducer(state, actions)
}

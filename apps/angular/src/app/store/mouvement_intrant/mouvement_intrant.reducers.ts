import { Action, createReducer, on } from '@ngrx/store'
import * as fromMouvementIntrants from './index'
import { IMouvementIntrantState } from './mouvement_intrant.model'

/**
 * État initial du reducer des mouvements d'intrants
 */
export const initialMouvementIntrantState: IMouvementIntrantState = {
  mouvementIntrants: [],
  mouvementIntrantWithFilters: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des mouvements d'intrants
 */
const reducer = createReducer<IMouvementIntrantState>(
  initialMouvementIntrantState,

  /**
   * Gestion des actions de récupération d'un mouvement d'intrant
   */
  on(fromMouvementIntrants.getMouvementIntrant, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromMouvementIntrants.getMouvementIntrantSuccess, (state, { oneMouvementIntrant }) => ({
    ...state,
    isLoading: false,
    oneMouvementIntrant,
  })),

  /**
   * Gestion des actions de récupération de tous les mouvements d'intrants
   */
  on(fromMouvementIntrants.getMouvementIntrants, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromMouvementIntrants.getMouvementIntrantsSuccess, (state, { mouvementIntrants }) => ({
    ...state,
    isLoading: false,
    mouvementIntrants,
  })),

  /**
   * Gestion des actions de récupération filtrée des mouvements d'intrants
   */
  on(fromMouvementIntrants.getAllMouvementIntrantWithFilters, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromMouvementIntrants.getAllMouvementIntrantWithFiltersSuccess, (state, { mouvementIntrantWithFilters }) => ({
    ...state,
    isLoading: false,
    mouvementIntrantWithFilters,
  })),

  /**
   * Gestion des actions de création d'un mouvement d'intrant
   */
  on(fromMouvementIntrants.createMouvementIntrant, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromMouvementIntrants.createMouvementIntrantSuccess, (state, { mouvementIntrant }) => ({
    ...state,
    mouvementIntrants: [...state.mouvementIntrants, mouvementIntrant],
    isLoading: false,
  })),

  /**
   * Gestion des actions de mise à jour d'un mouvement d'intrant
   */
  on(fromMouvementIntrants.updateMouvementIntrant, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromMouvementIntrants.updateMouvementIntrantSuccess, (state, { mouvementIntrant }) => ({
    ...state,
    mouvementIntrants: state.mouvementIntrants.map((item) =>
      item.id === mouvementIntrant.id ? mouvementIntrant : item
    ),
    isLoading: false,
  })),

  /**
   * Gestion des actions de suppression d'un mouvement d'intrant
   */
  on(fromMouvementIntrants.deleteMouvementIntrant, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromMouvementIntrants.deleteMouvementIntrantSuccess, (state, { mouvementIntrant }) => ({
    ...state,
    mouvementIntrants: state.mouvementIntrants.filter((item) => item.id !== mouvementIntrant.id),
    isLoading: false,
  })),
)

/**
 * Fonction reducer exportée pour la gestion de l'état des mouvements d'intrants
 */
export function mouvementIntrantReducer(
  state = initialMouvementIntrantState,
  actions: Action,
): IMouvementIntrantState {
  return reducer(state, actions)
}

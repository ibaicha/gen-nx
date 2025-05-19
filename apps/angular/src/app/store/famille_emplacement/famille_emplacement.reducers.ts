import { Action, createReducer, on } from '@ngrx/store'
import { IFamilleEmplacementState } from './famille_emplacement.model'
import * as fromFamilleEmplacements from './index'

/**
 * État initial du reducer des familles d'emplacements
 */
export const initialFamilleEmplacementState: IFamilleEmplacementState = {
  familleEmplacements: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des familles d'emplacements
 */
const reducer = createReducer<IFamilleEmplacementState>(
  initialFamilleEmplacementState,

  /**
   * Gestion des actions de récupération d'une famille d'emplacement
   */
  on(fromFamilleEmplacements.getFamilleEmplacement, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromFamilleEmplacements.getFamilleEmplacementSuccess,
    (state, { oneFamilleEmplacement }) => ({
      ...state,
      isLoading: false,
      oneFamilleEmplacement,
    }),
  ),

  /**
   * Gestion des actions de récupération de toutes les familles d'emplacements
   */
  on(fromFamilleEmplacements.getFamilleEmplacements, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromFamilleEmplacements.getFamilleEmplacementsSuccess,
    (state, { familleEmplacements }) => ({
      ...state,
      isLoading: false,
      familleEmplacements,
    }),
  ),

  /**
   * Gestion des actions de création d'une famille d'emplacement
   */
  on(fromFamilleEmplacements.createFamilleEmplacement, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromFamilleEmplacements.createFamilleEmplacementSuccess,
    (state, { familleEmplacement }) => ({
      ...state,
      familleEmplacements: [...state.familleEmplacements, familleEmplacement],
      isLoading: false,
    }),
  ),

  /**
   * Gestion des actions de mise à jour d'une famille d'emplacement
   */
  on(fromFamilleEmplacements.updateFamilleEmplacement, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromFamilleEmplacements.updateFamilleEmplacementSuccess,
    (state, { familleEmplacement }) => ({
      ...state,
      familleEmplacements: state.familleEmplacements.map((item) =>
        item.id === familleEmplacement.id ? familleEmplacement : item,
      ),
      isLoading: false,
    }),
  ),

  /**
   * Gestion des actions de suppression d'une famille d'emplacement
   */
  on(fromFamilleEmplacements.deleteFamilleEmplacement, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromFamilleEmplacements.deleteFamilleEmplacementSuccess,
    (state, { familleEmplacement }) => ({
      ...state,
      familleEmplacements: state.familleEmplacements.filter(
        (item) => item.id !== familleEmplacement.id,
      ),
      isLoading: false,
    }),
  ),
)

/**
 * Fonction reducer exportée pour la gestion des familles d'emplacements
 */
export function familleEmplacementReducer(
  state = initialFamilleEmplacementState,
  actions: Action,
): IFamilleEmplacementState {
  return reducer(state, actions)
}

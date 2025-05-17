import { Action, createReducer, on } from '@ngrx/store'
import { IFiliereState } from './filiere.model'
import * as fromFilieres from './index'

/**
 * État initial du reducer des filières
 */
export const initialFiliereState: IFiliereState = {
  filieres: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des filières
 */
const reducer = createReducer<IFiliereState>(
  initialFiliereState,

  /**
   * Gestion des actions de récupération d'une filière
   */
  on(fromFilieres.getFiliere, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromFilieres.getFiliereSuccess, (state, { oneFiliere }) => ({
    ...state,
    isLoading: false,
    oneFiliere,
  })),

  /**
   * Gestion des actions de récupération de toutes les filières
   */
  on(fromFilieres.getFilieres, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromFilieres.getFilieresSuccess, (state, { filieres }) => ({
    ...state,
    isLoading: false,
    filieres,
  })),

  /**
   * Gestion des actions de création d'une filière
   */
  on(fromFilieres.createFiliere, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromFilieres.createFiliereSuccess, (state, { filiere }) => ({
    ...state,
    filieres: [...state.filieres, filiere],
    isLoading: false,
  })),

  /**
   * Gestion des actions de mise à jour d'une filière
   */
  on(fromFilieres.updateFiliere, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromFilieres.updateFiliereSuccess, (state, { filiere }) => ({
    ...state,
    filieres: state.filieres.map((item) => 
      item.id === filiere.id ? filiere : item
    ),
    isLoading: false,
  })),

  /**
   * Gestion des actions de suppression d'une filière
   */
  on(fromFilieres.deleteFiliere, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromFilieres.deleteFiliereSuccess, (state, { filiere }) => ({
    ...state,
    filieres: state.filieres.filter((item) => item.id !== filiere.id),
    isLoading: false,
  })),
)

/**
 * Fonction reducer exportée pour la gestion de l'état des filières
 */
export function filiereReducer(
  state = initialFiliereState,
  actions: Action,
): IFiliereState {
  return reducer(state, actions)
}

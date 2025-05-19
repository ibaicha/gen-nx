import { Action, createReducer, on } from '@ngrx/store'
import { IRemboursementState } from './remboursement.model'
import * as fromRemboursements from './index'

/**
 * État initial du reducer des remboursements
 */
export const initialRemboursementState: IRemboursementState = {
  remboursements: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des remboursements
 */
const reducer = createReducer<IRemboursementState>(
  initialRemboursementState,

  /**
   * Gestion des actions de récupération d'un remboursement
   */
  on(fromRemboursements.getRemboursement, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromRemboursements.getRemboursementSuccess,
    (state, { oneRemboursement }) => ({
      ...state,
      isLoading: false,
      oneRemboursement,
    }),
  ),

  /**
   * Gestion des actions de récupération de tous les remboursements
   */
  on(fromRemboursements.getRemboursements, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromRemboursements.getRemboursementsSuccess,
    (state, { remboursements }) => ({
      ...state,
      isLoading: false,
      remboursements,
    }),
  ),

  /**
   * Gestion des actions de création d'un remboursement
   */
  on(fromRemboursements.createRemboursement, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromRemboursements.createRemboursementSuccess,
    (state, { remboursement }) => ({
      ...state,
      remboursements: [...state.remboursements, remboursement],
      isLoading: false,
    }),
  ),

  /**
   * Gestion des actions de mise à jour d'un remboursement
   */
  on(fromRemboursements.updateRemboursement, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromRemboursements.updateRemboursementSuccess,
    (state, { remboursement }) => ({
      ...state,
      remboursements: state.remboursements.map((item) =>
        item.id === remboursement.id ? remboursement : item,
      ),
      isLoading: false,
    }),
  ),

  /**
   * Gestion des actions de suppression d'un remboursement
   */
  on(fromRemboursements.deleteRemboursement, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromRemboursements.deleteRemboursementSuccess,
    (state, { remboursement }) => ({
      ...state,
      remboursements: state.remboursements.filter(
        (item) => item.id !== remboursement.id,
      ),
      isLoading: false,
    }),
  ),
)

/**
 * Fonction reducer exportée pour être utilisée par le store
 */
export function remboursementReducer(
  state = initialRemboursementState,
  actions: Action,
): IRemboursementState {
  return reducer(state, actions)
}

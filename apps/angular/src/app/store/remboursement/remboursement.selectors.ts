import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IRemboursementState } from './remboursement.model'

/**
 * Sélecteur de base pour l'état des remboursements
 */
export const selectRemboursementState =
  createFeatureSelector<IRemboursementState>('remboursement')

/**
 * Sélecteurs dérivés pour les différentes parties de l'état
 */

/**
 * Sélecteur pour obtenir la liste complète des remboursements
 */
export const selectRemboursementsList = createSelector(
  selectRemboursementState,
  (state) => state.remboursements,
)

/**
 * Sélecteur pour obtenir l'état de chargement
 */
export const selectRemboursementIsLoading = createSelector(
  selectRemboursementState,
  (state) => state.isLoading,
)

/**
 * Sélecteur pour obtenir un remboursement par son ID
 * @param itemId - ID du remboursement à rechercher
 */
export const selectRemboursementById = (itemId: number) =>
  createSelector(selectRemboursementState, (state) =>
    state.remboursements?.find((item) => item.id === itemId),
  )

/**
 * Sélecteur pour obtenir la liste des remboursements d'une exploitation
 * @param idExploitation - ID de l'exploitation
 */
export const selectRemboursementsListFromExploitation = (
  idExploitation: number,
) =>
  createSelector(
    selectRemboursementState,
    (state) =>
      state?.remboursements?.filter(
        (remboursement) => remboursement.exploitationId === idExploitation,
      ) || [],
  )

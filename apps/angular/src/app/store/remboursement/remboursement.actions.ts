import { createAction, props } from '@ngrx/store'
import { IRemboursement } from '../../interfaces/credit.interface'

// ========== CONSTANTES ==========

/**
 * Préfixe pour toutes les actions liées aux remboursements
 */
const prefix = '[Remboursements]'

// Types d'actions communs
const GET = 'Get'
const CREATE = 'Create'
const UPDATE = 'Update'
const DELETE = 'Delete'
const SUCCESS = 'Success'

// ========== ACTIONS DE LECTURE ==========

/**
 * Actions pour la récupération d'un remboursement spécifique par son ID
 */
export const getRemboursement = createAction(
  `${prefix} ${GET} Single Remboursement`,
  props<{ id: number }>(),
)

export const getRemboursementSuccess = createAction(
  `${prefix} ${GET} Single Remboursement ${SUCCESS}`,
  props<{ oneRemboursement: IRemboursement }>(),
)

/**
 * Actions pour la récupération de la liste complète des remboursements
 */
export const getRemboursements = createAction(
  `${prefix} ${GET} All Remboursements`,
)

export const getRemboursementsSuccess = createAction(
  `${prefix} ${GET} All Remboursements ${SUCCESS}`,
  props<{ remboursements: IRemboursement[] }>(),
)

// ========== ACTIONS DE MODIFICATION ==========

/**
 * Actions pour la création d'un nouveau remboursement
 */
export const createRemboursement = createAction(
  `${prefix} ${CREATE} Remboursement`,
  props<{ remboursement: IRemboursement }>(),
)

export const createRemboursementSuccess = createAction(
  `${prefix} ${CREATE} Remboursement ${SUCCESS}`,
  props<{ remboursement: IRemboursement }>(),
)

/**
 * Actions pour la mise à jour d'un remboursement existant
 */
export const updateRemboursement = createAction(
  `${prefix} ${UPDATE} Remboursement`,
  props<{ remboursement: IRemboursement }>(),
)

export const updateRemboursementSuccess = createAction(
  `${prefix} ${UPDATE} Remboursement ${SUCCESS}`,
  props<{ remboursement: IRemboursement }>(),
)

/**
 * Actions pour la suppression d'un remboursement
 */
export const deleteRemboursement = createAction(
  `${prefix} ${DELETE} Remboursement`,
  props<{ remboursement: IRemboursement }>(),
)

export const deleteRemboursementSuccess = createAction(
  `${prefix} ${DELETE} Remboursement ${SUCCESS}`,
  props<{ remboursement: IRemboursement }>(),
)

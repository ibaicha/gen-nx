import { createAction, props } from '@ngrx/store'
import { IVariete } from '@shared-models'

// ========== CONSTANTES ==========

/**
 * Préfixe pour toutes les actions liées aux variétés
 */
const prefix = '[Varietes]'

// Types d'actions communs
const GET = 'Get'
const CREATE = 'Create'
const UPDATE = 'Update'
const DELETE = 'Delete'
const SUCCESS = 'Success'

// ========== ACTIONS DE LECTURE ==========

/**
 * Actions pour la récupération d'une variété spécifique par son ID
 */
export const getVariete = createAction(
  `${prefix} ${GET} Single Variete`,
  props<{ id: number }>(),
)

export const getVarieteSuccess = createAction(
  `${prefix} ${GET} Single Variete ${SUCCESS}`,
  props<{ oneVariete: IVariete }>(),
)

/**
 * Actions pour la récupération de la liste complète des variétés
 */
export const getVarietes = createAction(`${prefix} ${GET} All Varietes`)

export const getVarietesSuccess = createAction(
  `${prefix} ${GET} All Varietes ${SUCCESS}`,
  props<{ varietes: IVariete[] }>(),
)

// ========== ACTIONS DE MODIFICATION ==========

/**
 * Actions pour la création d'une nouvelle variété
 */
export const createVariete = createAction(
  `${prefix} ${CREATE} Variete`,
  props<{ variete: IVariete }>(),
)

export const createVarieteSuccess = createAction(
  `${prefix} ${CREATE} Variete ${SUCCESS}`,
  props<{ variete: IVariete }>(),
)

/**
 * Actions pour la mise à jour d'une variété existante
 */
export const updateVariete = createAction(
  `${prefix} ${UPDATE} Variete`,
  props<{ variete: IVariete }>(),
)

export const updateVarieteSuccess = createAction(
  `${prefix} ${UPDATE} Variete ${SUCCESS}`,
  props<{ variete: IVariete }>(),
)

/**
 * Actions pour la suppression d'une variété
 */
export const deleteVariete = createAction(
  `${prefix} ${DELETE} Variete`,
  props<{ variete: IVariete }>(),
)

export const deleteVarieteSuccess = createAction(
  `${prefix} ${DELETE} Variete ${SUCCESS}`,
  props<{ variete: IVariete }>(),
)

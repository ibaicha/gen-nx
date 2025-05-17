import { createAction, props } from '@ngrx/store'
import { IPoint } from '@shared-models'


// ========== CONSTANTES ==========

/**
 * Préfixe pour toutes les actions liées aux points
 */
const prefix = '[Points]'

// Types d'actions communs
const GET = 'Get'
const CREATE = 'Create'
const UPDATE = 'Update'
const DELETE = 'Delete'
const SUCCESS = 'Success'

// ========== ACTIONS DE LECTURE ==========

/**
 * Actions pour la récupération d'un point spécifique par son ID
 */
export const getPoint = createAction(
  `${prefix} ${GET} Single Point`,
  props<{ id: number }>()
)

export const getPointSuccess = createAction(
  `${prefix} ${GET} Single Point ${SUCCESS}`,
  props<{ onePoint: IPoint }>()
)

/**
 * Actions pour la récupération de la liste complète des points
 */
export const getPoints = createAction(`${prefix} ${GET} All Points`)

export const getPointsSuccess = createAction(
  `${prefix} ${GET} All Points ${SUCCESS}`,
  props<{ points: IPoint[] }>()
)

// ========== ACTIONS DE MODIFICATION ==========

/**
 * Actions pour la création d'un nouveau point
 */
export const createPoint = createAction(
  `${prefix} ${CREATE} Point`,
  props<{ point: IPoint }>()
)

export const createPointSuccess = createAction(
  `${prefix} ${CREATE} Point ${SUCCESS}`,
  props<{ point: IPoint }>()
)

/**
 * Actions pour la mise à jour d'un point existant
 */
export const updatePoint = createAction(
  `${prefix} ${UPDATE} Point`,
  props<{ point: IPoint }>()
)

export const updatePointSuccess = createAction(
  `${prefix} ${UPDATE} Point ${SUCCESS}`,
  props<{ point: IPoint }>()
)

/**
 * Actions pour la suppression d'un point
 */
export const deletePoint = createAction(
  `${prefix} ${DELETE} Point`,
  props<{ point: IPoint }>()
)

export const deletePointSuccess = createAction(
  `${prefix} ${DELETE} Point ${SUCCESS}`,
  props<{ point: IPoint }>()
)

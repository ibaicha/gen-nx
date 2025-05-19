import { createAction, props } from '@ngrx/store'
import { IPointAgence } from '@shared-models'

// ========== CONSTANTES ==========

/**
 * Préfixe pour toutes les actions liées aux points d'agence
 */
const prefix = '[PointAgences]'

// Types d'actions communs
const GET = 'Get'
const CREATE = 'Create'
const UPDATE = 'Update'
const DELETE = 'Delete'
const SUCCESS = 'Success'

// ========== ACTIONS DE LECTURE ==========

/**
 * Actions pour la récupération d'un point d'agence spécifique par son ID
 */
export const getPointAgence = createAction(
  `${prefix} ${GET} Single PointAgence`,
  props<{ id: number }>(),
)

export const getPointAgenceSuccess = createAction(
  `${prefix} ${GET} Single PointAgence ${SUCCESS}`,
  props<{ onePointAgence: IPointAgence }>(),
)

/**
 * Actions pour la récupération de la liste complète des points d'agence
 */
export const getPointAgences = createAction(`${prefix} ${GET} All PointAgences`)

export const getPointAgencesSuccess = createAction(
  `${prefix} ${GET} All PointAgences ${SUCCESS}`,
  props<{ pointAgences: IPointAgence[] }>(),
)

// ========== ACTIONS DE MODIFICATION ==========

/**
 * Actions pour la création d'un nouveau point d'agence
 */
export const createPointAgence = createAction(
  `${prefix} ${CREATE} PointAgence`,
  props<{ pointAgence: IPointAgence }>(),
)

export const createPointAgenceSuccess = createAction(
  `${prefix} ${CREATE} PointAgence ${SUCCESS}`,
  props<{ pointAgence: IPointAgence }>(),
)

/**
 * Actions pour la mise à jour d'un point d'agence existant
 */
export const updatePointAgence = createAction(
  `${prefix} ${UPDATE} PointAgence`,
  props<{ pointAgence: IPointAgence }>(),
)

export const updatePointAgenceSuccess = createAction(
  `${prefix} ${UPDATE} PointAgence ${SUCCESS}`,
  props<{ pointAgence: IPointAgence }>(),
)

/**
 * Actions pour la suppression d'un point d'agence
 */
export const deletePointAgence = createAction(
  `${prefix} ${DELETE} PointAgence`,
  props<{ pointAgence: IPointAgence }>(),
)

export const deletePointAgenceSuccess = createAction(
  `${prefix} ${DELETE} PointAgence ${SUCCESS}`,
  props<{ pointAgence: IPointAgence }>(),
)

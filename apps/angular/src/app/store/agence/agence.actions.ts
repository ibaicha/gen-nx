import { createAction, props } from '@ngrx/store'
import { IAgence } from '@shared-models'


// ========== CONSTANTES ==========

/**
 * Préfixe pour toutes les actions liées aux sociétés
 */
const prefix = '[Agences]'

// Types d'actions communs
const GET = 'Get'
const CREATE = 'Create'
const UPDATE = 'Update'
const DELETE = 'Delete'
const SUCCESS = 'Success'

// ========== ACTIONS DE LECTURE ==========

/**
 * Actions pour la récupération d'une société spécifique par son ID
 */
export const getAgence = createAction(
  `${prefix} ${GET} Single Agence`,
  props<{ id: number }>(),
)

export const getAgenceSuccess = createAction(
  `${prefix} ${GET} Single Agence ${SUCCESS}`,
  props<{ oneAgence: IAgence }>(),
)

/**
 * Actions pour la récupération de la liste complète des sociétés
 */
export const getAgences = createAction(`${prefix} ${GET} All Agences`)

export const getAgencesSuccess = createAction(
  `${prefix} ${GET} All Agences ${SUCCESS}`,
  props<{ agences: IAgence[] }>(),
)

// ========== ACTIONS DE MODIFICATION ==========

/**
 * Actions pour la création d'une nouvelle société
 */
export const createAgence = createAction(
  `${prefix} ${CREATE} Agence`,
  props<{ agence: IAgence }>(),
)

export const createAgenceSuccess = createAction(
  `${prefix} ${CREATE} Agence ${SUCCESS}`,
  props<{ agence: IAgence }>(),
)

/**
 * Actions pour la mise à jour d'une société existante
 */
export const updateAgence = createAction(
  `${prefix} ${UPDATE} Agence`,
  props<{ agence: IAgence }>(),
)

export const updateAgenceSuccess = createAction(
  `${prefix} ${UPDATE} Agence ${SUCCESS}`,
  props<{ agence: IAgence }>(),
)

/**
 * Actions pour la suppression d'une société
 */
export const deleteAgence = createAction(
  `${prefix} ${DELETE} Agence`,
  props<{ agence: IAgence }>(),
)

export const deleteAgenceSuccess = createAction(
  `${prefix} ${DELETE} Agence ${SUCCESS}`,
  props<{ agence: IAgence }>(),
)

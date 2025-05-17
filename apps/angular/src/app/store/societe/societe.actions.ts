import { createAction, props } from '@ngrx/store'
import { ISociete } from '@shared-models'
 

// ========== CONSTANTES ==========

/**
 * Préfixe pour toutes les actions liées aux sociétés
 */
const prefix = '[Societes]'

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
export const getSociete = createAction(
  `${prefix} ${GET} Single Societe`,
  props<{ id: number }>()
)

export const getSocieteSuccess = createAction(
  `${prefix} ${GET} Single Societe ${SUCCESS}`,
  props<{ oneSociete: ISociete }>()
)

/**
 * Actions pour la récupération de la liste complète des sociétés
 */
export const getSocietes = createAction(`${prefix} ${GET} All Societes`)

export const getSocietesSuccess = createAction(
  `${prefix} ${GET} All Societes ${SUCCESS}`,
  props<{ societes: ISociete[] }>()
)

// ========== ACTIONS DE MODIFICATION ==========

/**
 * Actions pour la création d'une nouvelle société
 */
export const createSociete = createAction(
  `${prefix} ${CREATE} Societe`,
  props<{ societe: ISociete }>()
)

export const createSocieteSuccess = createAction(
  `${prefix} ${CREATE} Societe ${SUCCESS}`,
  props<{ societe: ISociete }>()
)

/**
 * Actions pour la mise à jour d'une société existante
 */
export const updateSociete = createAction(
  `${prefix} ${UPDATE} Societe`,
  props<{ societe: ISociete }>()
)

export const updateSocieteSuccess = createAction(
  `${prefix} ${UPDATE} Societe ${SUCCESS}`,
  props<{ societe: ISociete }>()
)

/**
 * Actions pour la suppression d'une société
 */
export const deleteSociete = createAction(
  `${prefix} ${DELETE} Societe`,
  props<{ societe: ISociete }>()
)

export const deleteSocieteSuccess = createAction(
  `${prefix} ${DELETE} Societe ${SUCCESS}`,
  props<{ societe: ISociete }>()
)

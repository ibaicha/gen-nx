import { createAction, props } from '@ngrx/store'
import { ILocalite } from '@shared-models'


// ========== CONSTANTES ==========

/**
 * Préfixe pour toutes les actions liées aux localites
 */
const prefix = '[Localites]'

// Types d'actions communs
const GET = 'Get'
const CREATE = 'Create'
const UPDATE = 'Update'
const DELETE = 'Delete'
const SUCCESS = 'Success'

// ========== ACTIONS DE LECTURE ==========

/**
 * Actions pour la récupération d'une localite spécifique par son ID
 */
export const getLocalite = createAction(
  `${prefix} ${GET} Single Localite`,
  props<{ id: number }>()
)

export const getLocaliteSuccess = createAction(
  `${prefix} ${GET} Single Localite ${SUCCESS}`,
  props<{ oneLocalite: ILocalite }>()
)

/**
 * Actions pour la récupération de la liste complète des localites
 */
export const getLocalites = createAction(`${prefix} ${GET} All Localites`)

export const getLocalitesSuccess = createAction(
  `${prefix} ${GET} All Localites ${SUCCESS}`,
  props<{ localites: ILocalite[] }>()
)

// ========== ACTIONS DE MODIFICATION ==========

/**
 * Actions pour la création d'une nouvelle localite
 */
export const createLocalite = createAction(
  `${prefix} ${CREATE} Localite`,
  props<{ localite: ILocalite }>()
)

export const createLocaliteSuccess = createAction(
  `${prefix} ${CREATE} Localite ${SUCCESS}`,
  props<{ localite: ILocalite }>()
)

/**
 * Actions pour la mise à jour d'une localite existante
 */
export const updateLocalite = createAction(
  `${prefix} ${UPDATE} Localite`,
  props<{ localite: ILocalite }>()
)

export const updateLocaliteSuccess = createAction(
  `${prefix} ${UPDATE} Localite ${SUCCESS}`,
  props<{ localite: ILocalite }>()
)

/**
 * Actions pour la suppression d'une localite
 */
export const deleteLocalite = createAction(
  `${prefix} ${DELETE} Localite`,
  props<{ localite: ILocalite }>()
)

export const deleteLocaliteSuccess = createAction(
  `${prefix} ${DELETE} Localite ${SUCCESS}`,
  props<{ localite: ILocalite }>()
)

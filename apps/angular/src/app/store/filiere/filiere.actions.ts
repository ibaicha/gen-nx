import { createAction, props } from '@ngrx/store'
import { IFiliere } from '@shared-models'

/**
 * Préfixe pour toutes les actions liées aux filières
 */
const prefix = '[Filieres]'

/**
 * Actions pour la récupération d'une filière spécifique
 */
export const getFiliere = createAction(
  `${prefix} Get Single Filiere`,
  props<{ id: number }>(),
)

export const getFiliereSuccess = createAction(
  `${getFiliere.type} Success`,
  props<{ oneFiliere: IFiliere }>(),
)

/**
 * Actions pour la récupération de toutes les filières
 */
export const getFilieres = createAction(`${prefix} Get All Filieres`)

export const getFilieresSuccess = createAction(
  `${getFilieres.type} Success`,
  props<{ filieres: IFiliere[] }>(),
)

/**
 * Actions pour la création d'une nouvelle filière
 */
export const createFiliere = createAction(
  `${prefix} Create Filiere`,
  props<{ filiere: IFiliere }>(),
)

export const createFiliereSuccess = createAction(
  `${createFiliere.type} Success`,
  props<{ filiere: IFiliere }>(),
)

/**
 * Actions pour la mise à jour d'une filière existante
 */
export const updateFiliere = createAction(
  `${prefix} Update Filiere`,
  props<{ filiere: IFiliere }>(),
)

export const updateFiliereSuccess = createAction(
  `${updateFiliere.type} Success`,
  props<{ filiere: IFiliere }>(),
)

/**
 * Actions pour la suppression d'une filière
 */
export const deleteFiliere = createAction(
  `${prefix} Delete Filiere`,
  props<{ filiere: IFiliere }>(),
)

export const deleteFiliereSuccess = createAction(
  `${deleteFiliere.type} Success`,
  props<{ filiere: IFiliere }>(),
)

import { createAction, props } from '@ngrx/store'
import { ITypeSociete } from '@shared-models'
 
/**
 * Préfixe pour toutes les actions liées aux types de sociétés
 */
const prefix = '[TypeSocietes]'

/**
 * Actions pour la récupération d'un type de société spécifique
 */
export const getTypeSociete = createAction(
  `${prefix} Get Single TypeSociete`,
  props<{ id: number }>()
)

export const getTypeSocieteSuccess = createAction(
  `${getTypeSociete.type} Success`,
  props<{ oneTypeSociete: ITypeSociete }>()
)

/**
 * Actions pour la récupération de tous les types de sociétés
 */
export const getTypeSocietes = createAction(
  `${prefix} Get All TypeSocietes`
)

export const getTypeSocietesSuccess = createAction(
  `${getTypeSocietes.type} Success`,
  props<{ typeSocietes: ITypeSociete[] }>()
)

/**
 * Actions pour la création d'un nouveau type de société
 */
export const createTypeSociete = createAction(
  `${prefix} Create TypeSociete`,
  props<{ typeSociete: ITypeSociete }>()
)

export const createTypeSocieteSuccess = createAction(
  `${createTypeSociete.type} Success`,
  props<{ typeSociete: ITypeSociete }>()
)

/**
 * Actions pour la mise à jour d'un type de société existant
 */
export const updateTypeSociete = createAction(
  `${prefix} Update TypeSociete`,
  props<{ typeSociete: ITypeSociete }>()
)

export const updateTypeSocieteSuccess = createAction(
  `${updateTypeSociete.type} Success`,
  props<{ typeSociete: ITypeSociete }>()
)

/**
 * Actions pour la suppression d'un type de société
 */
export const deleteTypeSociete = createAction(
  `${prefix} Delete TypeSociete`,
  props<{ typeSociete: ITypeSociete }>()
)

export const deleteTypeSocieteSuccess = createAction(
  `${deleteTypeSociete.type} Success`,
  props<{ typeSociete: ITypeSociete }>()
)

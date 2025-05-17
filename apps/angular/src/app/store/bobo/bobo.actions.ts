import { createAction, props } from '@ngrx/store'
import { IBobo } from '../../interfaces/bobo.interface'
 

/**
 * Préfixe pour toutes les actions liées aux bobos
 */
const prefix = '[Bobos]'

/**
 * Actions pour la récupération d'un bobo spécifique
 */
export const getBobo = createAction(
  `${prefix} Get Single Bobo`,
  props<{ id: number }>()
)

export const getBoboSuccess = createAction(
  `${getBobo.type} Success`,
  props<{ oneBobo: IBobo }>()
)

/**
 * Actions pour la récupération de tous les bobos
 */
export const getBobos = createAction(
  `${prefix} Get All Bobos`
)

export const getBobosSuccess = createAction(
  `${getBobos.type} Success`,
  props<{ bobos: IBobo[] }>()
)

/**
 * Actions pour la création d'un nouveau bobo
 */
export const createBobo = createAction(
  `${prefix} Create Bobo`,
  props<{ bobo: IBobo }>()
)

export const createBoboSuccess = createAction(
  `${createBobo.type} Success`,
  props<{ bobo: IBobo }>()
)

/**
 * Actions pour la mise à jour d'un bobo existant
 */
export const updateBobo = createAction(
  `${prefix} Update Bobo`,
  props<{ bobo: IBobo }>()
)

export const updateBoboSuccess = createAction(
  `${updateBobo.type} Success`,
  props<{ bobo: IBobo }>()
)

/**
 * Actions pour la suppression d'un bobo
 */
export const deleteBobo = createAction(
  `${prefix} Delete Bobo`,
  props<{ bobo: IBobo }>()
)

export const deleteBoboSuccess = createAction(
  `${deleteBobo.type} Success`,
  props<{ bobo: IBobo }>()
)

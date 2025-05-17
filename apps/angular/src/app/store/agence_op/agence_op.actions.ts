import { createAction, props } from '@ngrx/store'
import { GetAgenceOpParamsDTO, IAgenceOp } from '@shared-models'

/**
 * Préfixe pour toutes les actions liées aux crédits
 */
const prefix = '[AgenceOps]'

/**
 * Actions pour la récupération d'un crédit spécifique
 */
export const getAgenceOp = createAction(
  `${prefix} Get Single AgenceOp`,
  props<{ id: number }>(),
)

export const getAgenceOpSuccess = createAction(
  `${getAgenceOp.type} Success`,
  props<{ oneAgenceOp: IAgenceOp }>(),
)

/**
 * Actions pour la récupération de tous les crédits
 */
export const getAgenceOps = createAction(`${prefix} Get All AgenceOps`)

export const getAgenceOpsSuccess = createAction(
  `${getAgenceOps.type} Success`,
  props<{ agenceOps: IAgenceOp[] }>(),
)

/**
 * Actions pour la récupération de tous les OPs avec filtres
 */
export const getCreditsAgencesWithFilters = createAction(
  `${prefix} Get CreditsAgences With Filters`,
  props<{ filter: GetAgenceOpParamsDTO }>(),
)
export const getCreditsAgencesWithFiltersSuccess = createAction(
  `${getCreditsAgencesWithFilters.type} Success`,
  props<{ creditsAgencesWithFilters: IAgenceOp[] }>(),
)

export const getCreditsAgencesWithFiltersFailure = createAction(
  '${prefix} Get CreditsAgences With Filters Failure',
  props<{ error: any }>(),
)

/**
 * Actions pour la création d'un crédit
 */
export const createAgenceOp = createAction(
  `${prefix} Create AgenceOp`,
  props<{ body: any }>(),
)

export const createAgenceOpSuccess = createAction(
  `${createAgenceOp.type} Success`,
  props<{ agenceOp: IAgenceOp }>(),
)

/**
 * Actions pour la mise à jour d'un crédit
 */
export const updateAgenceOp = createAction(
  `${prefix} Update AgenceOp`,
  props<{ body: any }>(),
)

export const updateAgenceOpSuccess = createAction(
  `${updateAgenceOp.type} Success`,
  props<{ agenceOp: IAgenceOp }>(),
)

/**
 * Actions pour la suppression d'un crédit
 */
export const deleteAgenceOp = createAction(
  `${prefix} Delete AgenceOp`,
  props<{ body: any }>(),
)

export const deleteAgenceOpSuccess = createAction(
  `${deleteAgenceOp.type} Success`,
  props<{ agenceOp: IAgenceOp }>(),
)

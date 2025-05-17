import { createAction, props } from '@ngrx/store'
import { CreateOpPortefeuilleDto, IOp } from '@shared-models'

// ========== CONSTANTES ==========

/**
 * Préfixe pour toutes les actions liées aux OPs
 */
const prefix = '[Ops]'

// ========== ACTIONS DE LECTURE ==========

/**
 * Actions pour la récupération d'une OP spécifique par son ID
 */
export const getOp = createAction(
  `${prefix} Get Single Op`,
  props<{ id: number }>(),
)

export const getOpSuccess = createAction(
  `${getOp.type} Success`,
  props<{ oneOp: IOp }>(),
)

/**
 * Actions pour la récupération de la liste complète des OPs
 */
export const getOps = createAction(`${prefix} Get All Ops`)

export const getOpsSuccess = createAction(
  `${getOps.type} Success`,
  props<{ ops: IOp[] }>(),
)

/**
 * Actions pour la récupération de tous les OPs avec filtres
 */
export const getOpsWithFilters = createAction(
  `${prefix} Get Ops With Filters`,
  props<{ filter: any }>(),
)
export const getOpsWithFiltersSuccess = createAction(
  `${getOpsWithFilters.type} Success`,
  props<{ opsWithFilters: IOp[] }>(),
)

export const getOpsWithFiltersFailure = createAction(
  '${prefix} Get Ops With Filters Failure',
  props<{ error: any }>(),
)

/**
 * Actions pour la récupération des OPs personnalisées par agence
 */
export const getAllOpsCustomFromAgence = createAction(
  `${prefix} Get Custom Ops From Agence`,
  props<{ agenceId: number }>(),
)

export const getAllOpsCustomFromAgenceSuccess = createAction(
  `${getAllOpsCustomFromAgence.type} Success`,
  props<{ opsCustomFromAgences: IOp[] }>(),
)

// ========== ACTIONS DE MODIFICATION ==========

/**
 * Actions pour la création d'une nouvelle OP
 */
export const createOp = createAction(
  `${prefix} Create Op`,
  props<{ op: IOp }>(),
)

export const createOpSuccess = createAction(
  `${createOp.type} Success`,
  props<{ op: IOp }>(),
)

/**
 * Actions pour la création d'une nouvelle OP avec un portefeuille
 */
export const createOpPortefeuille = createAction(
  `${prefix} Create Op With Portefeuille`,
  props<{ opPortefeuille: CreateOpPortefeuilleDto }>(),
)
export const createOpPortefeuilleSuccess = createAction(
  `${createOpPortefeuille.type} Success`,
  props<{ opPortefeuille: CreateOpPortefeuilleDto }>(),
)

/**
 * Actions pour la mise à jour d'une OP existante
 */
export const updateOp = createAction(
  `${prefix} Update Op`,
  props<{ op: IOp }>(),
)

export const updateOpSuccess = createAction(
  `${updateOp.type} Success`,
  props<{ op: IOp }>(),
)

/**
 * Actions pour la suppression d'une OP
 */
export const deleteOp = createAction(
  `${prefix} Delete Op`,
  props<{ op: IOp }>(),
)

export const deleteOpSuccess = createAction(
  `${deleteOp.type} Success`,
  props<{ op: IOp }>(),
)

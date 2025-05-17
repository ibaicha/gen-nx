import { createAction, props } from '@ngrx/store'
import { GetCreditAgenceParamsDTO, ICreditAgence } from '@shared-models'

/**
 * Préfixe pour toutes les actions liées aux crédits
 */
const prefix = '[CreditAgences]'

/**
 * Actions pour la récupération d'un crédit spécifique
 */
export const getCreditAgence = createAction(
  `${prefix} Get Single CreditAgence`,
  props<{ id: number }>(),
)

export const getCreditAgenceSuccess = createAction(
  `${getCreditAgence.type} Success`,
  props<{ oneCreditAgence: ICreditAgence }>(),
)

/**
 * Actions pour la récupération de tous les crédits
 */
export const getCreditAgences = createAction(`${prefix} Get All CreditAgences`)

export const getCreditAgencesSuccess = createAction(
  `${getCreditAgences.type} Success`,
  props<{ creditAgences: ICreditAgence[] }>(),
)

/**
 * Actions pour la récupération de tous les OPs avec filtres
 */
export const getCreditsAgencesWithFilters = createAction(
  `${prefix} Get CreditsAgences With Filters`,
  props<{ filter: GetCreditAgenceParamsDTO }>(),
)
export const getCreditsAgencesWithFiltersSuccess = createAction(
  `${getCreditsAgencesWithFilters.type} Success`,
  props<{ creditsAgencesWithFilters: ICreditAgence[] }>(),
)

export const getCreditsAgencesWithFiltersFailure = createAction(
  '${prefix} Get CreditsAgences With Filters Failure',
  props<{ error: any }>(),
)

/**
 * Actions pour la création d'un crédit
 */
export const createCreditAgence = createAction(
  `${prefix} Create CreditAgence`,
  props<{ body: ICreditAgence }>(),
)

export const createCreditAgenceSuccess = createAction(
  `${createCreditAgence.type} Success`,
  props<{ creditAgence: ICreditAgence }>(),
)

/**
 * Actions pour la mise à jour d'un crédit
 */
export const updateCreditAgence = createAction(
  `${prefix} Update CreditAgence`,
  props<{ body: any }>(),
)

export const updateCreditAgenceSuccess = createAction(
  `${updateCreditAgence.type} Success`,
  props<{ creditAgence: ICreditAgence }>(),
)

/**
 * Actions pour la suppression d'un crédit
 */
export const deleteCreditAgence = createAction(
  `${prefix} Delete CreditAgence`,
  props<{ body: any }>(),
)

export const deleteCreditAgenceSuccess = createAction(
  `${deleteCreditAgence.type} Success`,
  props<{ creditAgence: ICreditAgence }>(),
)

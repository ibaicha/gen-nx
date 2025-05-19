import { createAction, props } from '@ngrx/store'
import { ICreditCustom } from '../../../interfaces/credit.interface'

/**
 * Préfixe pour toutes les actions liées aux crédits personnalisés
 */
const prefix = '[CreditCustoms]'

/**
 * Actions pour la récupération d'un crédit personnalisé spécifique
 */
export const getCreditCustom = createAction(
  `${prefix} Get Single CreditCustom`,
  props<{ id: number }>(),
)

export const getCreditCustomSuccess = createAction(
  `${getCreditCustom.type} Success`,
  props<{ oneCreditCustom: ICreditCustom }>(),
)

/**
 * Actions pour la récupération de tous les crédits personnalisés
 */
export const getCreditCustoms = createAction(`${prefix} Get All CreditCustoms`)

export const getCreditCustomsSuccess = createAction(
  `${getCreditCustoms.type} Success`,
  props<{ creditCustoms: ICreditCustom[] }>(),
)

import { createAction, props } from '@ngrx/store'
import {
  ICredit,
  ICreditCustom,
  IExploitationCredit,
} from '../../interfaces/credit.interface'

/**
 * Préfixe pour toutes les actions liées aux crédits
 */
const prefix = '[Credits]'

/**
 * Actions pour la récupération d'un crédit spécifique
 */
export const getCredit = createAction(
  `${prefix} Get Single Credit`,
  props<{ id: number }>(),
)

export const getCreditSuccess = createAction(
  `${getCredit.type} Success`,
  props<{ oneCredit: ICredit }>(),
)

/**
 * Actions pour la récupération de tous les crédits
 */
export const getCredits = createAction(`${prefix} Get All Credits`)

export const getCreditsSuccess = createAction(
  `${getCredits.type} Success`,
  props<{ credits: ICredit[] }>(),
)

/**
 * Actions pour la récupération des crédits personnalisés
 */
export const getCreditsCustom = createAction(`${prefix} Get Custom Credits`)

export const getCreditsCustomSuccess = createAction(
  `${getCreditsCustom.type} Success`,
  props<{ creditsCustom: ICreditCustom[] }>(),
)

/**
 * Actions pour la récupération des crédits avec filtres
 */
export const getAllCreditWithFilters = createAction(
  `${prefix} Get Credits With Filters`,
  props<{ filter: any }>(),
)

export const getAllCreditWithFiltersSuccess = createAction(
  `${getAllCreditWithFilters.type} Success`,
  props<{ creditWithFilters: ICreditCustom[] }>(),
)

/**
 * Actions pour la récupération des crédits personnalisés par agence, variété, année et saison
 */
export const getAllCustomCreditAgenceVarieteAnneeSaison = createAction(
  `${prefix} Get Credits By Agency Product Year Season`,
  props<{
    agenceSocieteId: number
    produitId: number
    anneeId: number
    saisonId: number
  }>(),
)

export const getAllCustomCreditAgenceVarieteAnneeSaisonSuccess = createAction(
  `${getAllCustomCreditAgenceVarieteAnneeSaison.type} Success`,
  props<{ customCreditAgenceVarieteAnneeSaison: ICreditCustom[] }>(),
)

/**
 * Actions pour la récupération des crédits personnalisés par société, variété, année et saison
 */
export const getAllCustomCreditSocieteVarieteAnneeSaison = createAction(
  `${prefix} Get Credits By Company Product Year Season`,
  props<{
    etablissementId: number
    produitId: number
    anneeId: number
    saisonId: number
  }>(),
)

export const getAllCustomCreditSocieteVarieteAnneeSaisonSuccess = createAction(
  `${getAllCustomCreditSocieteVarieteAnneeSaison.type} Success`,
  props<{ customCreditSocieteVarieteAnneeSaison: ICreditCustom[] }>(),
)

/**
 * Actions pour la création d'un crédit
 */
export const createCredit = createAction(
  `${prefix} Create Credit`,
  props<{ body: any }>(),
)

export const createCreditSuccess = createAction(
  `${createCredit.type} Success`,
  props<{ credit: ICredit }>(),
)

/**
 * Actions pour la création d'un crédit d'exploitation
 */
export const createExploitationCredit = createAction(
  `${prefix} Create Exploitation Credit`,
  props<{ body: any }>(),
)

export const createExploitationCreditSuccess = createAction(
  `${createExploitationCredit.type} Success`,
  props<{ exploitationCredit: IExploitationCredit }>(),
)

/**
 * Actions pour la mise à jour d'un crédit
 */
export const updateCredit = createAction(
  `${prefix} Update Credit`,
  props<{ body: any }>(),
)

export const updateCreditSuccess = createAction(
  `${updateCredit.type} Success`,
  props<{ credit: ICredit }>(),
)

/**
 * Actions pour la suppression d'un crédit
 */
export const deleteCredit = createAction(
  `${prefix} Delete Credit`,
  props<{ body: any }>(),
)

export const deleteCreditSuccess = createAction(
  `${deleteCredit.type} Success`,
  props<{ credit: ICredit }>(),
)

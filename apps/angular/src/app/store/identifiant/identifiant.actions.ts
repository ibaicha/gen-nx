import { createAction, props } from '@ngrx/store'
import { IIdentifiant } from '../../interfaces/identifiant.interface'

/**
 * Préfixe pour toutes les actions liées aux identifiants
 */
const prefix = '[Identifiants]'

// ========== ACTIONS DE LECTURE ==========

/**
 * Actions pour la récupération d'un identifiant spécifique par son ID
 */
export const getIdentifiant = createAction(
  `${prefix} Get Single Identifiant`,
  props<{ id: number }>(),
)

export const getIdentifiantSuccess = createAction(
  `${getIdentifiant.type} Success`,
  props<{ oneIdentifiant: IIdentifiant }>(),
)

/**
 * Actions pour la récupération de la liste complète des identifiants
 */
export const getIdentifiants = createAction(`${prefix} Get All Identifiants`)

export const getIdentifiantsSuccess = createAction(
  `${getIdentifiants.type} Success`,
  props<{ identifiants: IIdentifiant[] }>(),
)

/**
 * Actions pour la récupération filtrée des identifiants
 */
export const getAllIdentifiantsWithFilters = createAction(
  `${prefix} Get Identifiants With Filters`,
  props<{ filter: any }>(),
)

export const getAllIdentifiantsWithFiltersSuccess = createAction(
  `${getAllIdentifiantsWithFilters.type} Success`,
  props<{ identifiantWithFilters: IIdentifiant[] }>(),
)

// ========== ACTIONS DE MODIFICATION ==========

/**
 * Actions pour la création d'un nouvel identifiant
 */
export const createIdentifiant = createAction(
  `${prefix} Create Identifiant`,
  props<{ identifiant: IIdentifiant }>(),
)

export const createIdentifiantSuccess = createAction(
  `${createIdentifiant.type} Success`,
  props<{ identifiant: IIdentifiant }>(),
)

/**
 * Actions pour la mise à jour d'un identifiant existant
 */
export const updateIdentifiant = createAction(
  `${prefix} Update Identifiant`,
  props<{ identifiant: IIdentifiant }>(),
)

export const updateIdentifiantSuccess = createAction(
  `${updateIdentifiant.type} Success`,
  props<{ identifiant: IIdentifiant }>(),
)

/**
 * Actions pour la suppression d'un identifiant
 */
export const deleteIdentifiant = createAction(
  `${prefix} Delete Identifiant`,
  props<{ identifiant: IIdentifiant }>(),
)

export const deleteIdentifiantSuccess = createAction(
  `${deleteIdentifiant.type} Success`,
  props<{ identifiant: IIdentifiant }>(),
)

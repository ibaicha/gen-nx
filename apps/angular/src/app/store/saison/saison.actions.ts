import { createAction, props } from '@ngrx/store'
import { ISaison } from '@shared-models'

// ========== CONSTANTES ==========

/**
 * Préfixe pour toutes les actions liées aux saisons
 */
const prefix = '[Saisons]'

// Types d'actions communs
const GET = 'Get'
const CREATE = 'Create'
const UPDATE = 'Update'
const DELETE = 'Delete'
const SUCCESS = 'Success'

// ========== ACTIONS DE LECTURE ==========

/**
 * Actions pour la récupération d'une saison spécifique par son ID
 */
export const getSaison = createAction(
  `${prefix} ${GET} Single Saison`,
  props<{ id: number }>(),
)

export const getSaisonSuccess = createAction(
  `${prefix} ${GET} Single Saison ${SUCCESS}`,
  props<{ oneSaison: ISaison }>(),
)

/**
 * Actions pour la récupération de la liste complète des saisons
 */
export const getSaisons = createAction(`${prefix} ${GET} All Saisons`)

export const getSaisonsSuccess = createAction(
  `${prefix} ${GET} All Saisons ${SUCCESS}`,
  props<{ saisons: ISaison[] }>(),
)

// ========== ACTIONS DE MODIFICATION ==========

/**
 * Actions pour la création d'une nouvelle saison
 */
export const createSaison = createAction(
  `${prefix} ${CREATE} Saison`,
  props<{ saison: ISaison }>(),
)

export const createSaisonSuccess = createAction(
  `${prefix} ${CREATE} Saison ${SUCCESS}`,
  props<{ saison: ISaison }>(),
)

/**
 * Actions pour la mise à jour d'une saison existante
 */
export const updateSaison = createAction(
  `${prefix} ${UPDATE} Saison`,
  props<{ saison: ISaison }>(),
)

export const updateSaisonSuccess = createAction(
  `${prefix} ${UPDATE} Saison ${SUCCESS}`,
  props<{ saison: ISaison }>(),
)

/**
 * Actions pour la suppression d'une saison
 */
export const deleteSaison = createAction(
  `${prefix} ${DELETE} Saison`,
  props<{ saison: ISaison }>(),
)

export const deleteSaisonSuccess = createAction(
  `${prefix} ${DELETE} Saison ${SUCCESS}`,
  props<{ saison: ISaison }>(),
)

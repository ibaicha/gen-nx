import { createAction, props } from '@ngrx/store'
import { IFormeJuridique } from '@shared-models'


// ========== CONSTANTES ==========

/**
 * Préfixe pour toutes les actions liées aux formeJuridiques
 */
const prefix = '[FormeJuridiques]'

// Types d'actions communs
const GET = 'Get'
const CREATE = 'Create'
const UPDATE = 'Update'
const DELETE = 'Delete'
const SUCCESS = 'Success'

// ========== ACTIONS DE LECTURE ==========

/**
 * Actions pour la récupération d'une formeJuridique spécifique par son ID
 */
export const getFormeJuridique = createAction(
  `${prefix} ${GET} Single FormeJuridique`,
  props<{ id: number }>()
)

export const getFormeJuridiqueSuccess = createAction(
  `${prefix} ${GET} Single FormeJuridique ${SUCCESS}`,
  props<{ oneFormeJuridique: IFormeJuridique }>()
)

/**
 * Actions pour la récupération de la liste complète des formeJuridiques
 */
export const getFormeJuridiques = createAction(`${prefix} ${GET} All FormeJuridiques`)

export const getFormeJuridiquesSuccess = createAction(
  `${prefix} ${GET} All FormeJuridiques ${SUCCESS}`,
  props<{ formeJuridiques: IFormeJuridique[] }>()
)

// ========== ACTIONS DE MODIFICATION ==========

/**
 * Actions pour la création d'une nouvelle formeJuridique
 */
export const createFormeJuridique = createAction(
  `${prefix} ${CREATE} FormeJuridique`,
  props<{ formeJuridique: IFormeJuridique }>()
)

export const createFormeJuridiqueSuccess = createAction(
  `${prefix} ${CREATE} FormeJuridique ${SUCCESS}`,
  props<{ formeJuridique: IFormeJuridique }>()
)

/**
 * Actions pour la mise à jour d'une formeJuridique existante
 */
export const updateFormeJuridique = createAction(
  `${prefix} ${UPDATE} FormeJuridique`,
  props<{ formeJuridique: IFormeJuridique }>()
)

export const updateFormeJuridiqueSuccess = createAction(
  `${prefix} ${UPDATE} FormeJuridique ${SUCCESS}`,
  props<{ formeJuridique: IFormeJuridique }>()
)

/**
 * Actions pour la suppression d'une formeJuridique
 */
export const deleteFormeJuridique = createAction(
  `${prefix} ${DELETE} FormeJuridique`,
  props<{ formeJuridique: IFormeJuridique }>()
)

export const deleteFormeJuridiqueSuccess = createAction(
  `${prefix} ${DELETE} FormeJuridique ${SUCCESS}`,
  props<{ formeJuridique: IFormeJuridique }>()
)

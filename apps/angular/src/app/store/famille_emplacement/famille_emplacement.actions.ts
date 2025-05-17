import { createAction, props } from '@ngrx/store'
import { IFamilleEmplacement } from '@shared-models'


/**
 * Préfixe pour toutes les actions liées aux familles d'emplacements
 */
const prefix = '[FamilleEmplacements]'

/**
 * Actions pour la récupération d'une famille d'emplacement spécifique
 */
export const getFamilleEmplacement = createAction(
  `${prefix} Get Single FamilleEmplacement`,
  props<{ id: number }>()
)

export const getFamilleEmplacementSuccess = createAction(
  `${getFamilleEmplacement.type} Success`,
  props<{ oneFamilleEmplacement: IFamilleEmplacement }>()
)

/**
 * Actions pour la récupération de toutes les familles d'emplacements
 */
export const getFamilleEmplacements = createAction(
  `${prefix} Get All FamilleEmplacements`
)

export const getFamilleEmplacementsSuccess = createAction(
  `${getFamilleEmplacements.type} Success`,
  props<{ familleEmplacements: IFamilleEmplacement[] }>()
)

/**
 * Actions pour la création d'une nouvelle famille d'emplacement
 */
export const createFamilleEmplacement = createAction(
  `${prefix} Create FamilleEmplacement`,
  props<{ familleEmplacement: IFamilleEmplacement }>()
)

export const createFamilleEmplacementSuccess = createAction(
  `${createFamilleEmplacement.type} Success`,
  props<{ familleEmplacement: IFamilleEmplacement }>()
)

/**
 * Actions pour la mise à jour d'une famille d'emplacement existante
 */
export const updateFamilleEmplacement = createAction(
  `${prefix} Update FamilleEmplacement`,
  props<{ familleEmplacement: IFamilleEmplacement }>()
)

export const updateFamilleEmplacementSuccess = createAction(
  `${updateFamilleEmplacement.type} Success`,
  props<{ familleEmplacement: IFamilleEmplacement }>()
)

/**
 * Actions pour la suppression d'une famille d'emplacement
 */
export const deleteFamilleEmplacement = createAction(
  `${prefix} Delete FamilleEmplacement`,
  props<{ familleEmplacement: IFamilleEmplacement }>()
)

export const deleteFamilleEmplacementSuccess = createAction(
  `${deleteFamilleEmplacement.type} Success`,
  props<{ familleEmplacement: IFamilleEmplacement }>()
)

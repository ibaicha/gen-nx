import { createAction, props } from '@ngrx/store'
import { IAnnee } from '@shared-models'
 

/**
 * Préfixe pour toutes les actions liées aux années
 */
const prefix = '[Annees]'

/**
 * Actions pour la récupération d'une année spécifique
 */
export const getAnnee = createAction(
  `${prefix} Get Single Annee`,
  props<{ id: number }>()
)

export const getAnneeSuccess = createAction(
  `${getAnnee.type} Success`, 
  props<{ oneAnnee: IAnnee }>()
)

/**
 * Actions pour la récupération de toutes les années
 */
export const getAnnees = createAction(
  `${prefix} Get All Annees`
)

export const getAnneesSuccess = createAction(
  `${getAnnees.type} Success`,
  props<{ annees: IAnnee[] }>()
)

/**
 * Actions pour la création d'une nouvelle année
 */
export const createAnnee = createAction(
  `${prefix} Create Annee`,
  props<{ annee: IAnnee }>()
)

export const createAnneeSuccess = createAction(
  `${createAnnee.type} Success`,
  props<{ annee: IAnnee }>()
)

/**
 * Actions pour la mise à jour d'une année existante
 */
export const updateAnnee = createAction(
  `${prefix} Update Annee`,
  props<{ annee: IAnnee }>()
)

export const updateAnneeSuccess = createAction(
  `${updateAnnee.type} Success`,
  props<{ annee: IAnnee }>()
)

/**
 * Actions pour la suppression d'une année
 */
export const deleteAnnee = createAction(
  `${prefix} Delete Annee`,
  props<{ annee: IAnnee }>()
)

export const deleteAnneeSuccess = createAction(
  `${deleteAnnee.type} Success`,
  props<{ annee: IAnnee }>()
)

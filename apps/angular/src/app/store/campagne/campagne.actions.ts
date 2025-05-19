import { createAction, props } from '@ngrx/store'
import { ICampagne } from '@shared-models'

/**
 * Préfixe pour toutes les actions liées aux campagnes
 */
const prefix = '[Campagnes]'

/**
 * Actions pour la récupération d'une campagne spécifique
 */
export const getCampagne = createAction(
  `${prefix} Get Single Campagne`,
  props<{ id: number }>(),
)

export const getCampagneSuccess = createAction(
  `${getCampagne.type} Success`,
  props<{ oneCampagne: ICampagne }>(),
)

/**
 * Actions pour la récupération de toutes les campagnes
 */
export const getCampagnes = createAction(`${prefix} Get All Campagnes`)

export const getCampagnesSuccess = createAction(
  `${getCampagnes.type} Success`,
  props<{ campagnes: ICampagne[] }>(),
)

/**
 * Actions pour la création d'une nouvelle campagne
 */
export const createCampagne = createAction(
  `${prefix} Create Campagne`,
  props<{ campagne: ICampagne }>(),
)

export const createCampagneSuccess = createAction(
  `${createCampagne.type} Success`,
  props<{ campagne: ICampagne }>(),
)

/**
 * Actions pour la mise à jour d'une campagne existante
 */
export const updateCampagne = createAction(
  `${prefix} Update Campagne`,
  props<{ campagne: ICampagne }>(),
)

export const updateCampagneSuccess = createAction(
  `${updateCampagne.type} Success`,
  props<{ campagne: ICampagne }>(),
)

/**
 * Actions pour la suppression d'une campagne
 */
export const deleteCampagne = createAction(
  `${prefix} Delete Campagne`,
  props<{ campagne: ICampagne }>(),
)

export const deleteCampagneSuccess = createAction(
  `${deleteCampagne.type} Success`,
  props<{ campagne: ICampagne }>(),
)

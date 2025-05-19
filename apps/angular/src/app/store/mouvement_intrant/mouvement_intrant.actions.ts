import { createAction, props } from '@ngrx/store'
import { IMouvementIntrant } from '../../interfaces/mouvement-intrant.interface'
import { IIdentifiant } from '../../interfaces/identifiant.interface'

/**
 * Préfixe pour toutes les actions liées aux mouvements d'intrants
 */
const prefix = '[MouvementIntrants]'

/**
 * Actions pour la récupération d'un mouvement d'intrant spécifique
 */
export const getMouvementIntrant = createAction(
  `${prefix} Get Single MouvementIntrant`,
  props<{ id: number }>(),
)

export const getMouvementIntrantSuccess = createAction(
  `${getMouvementIntrant.type} Success`,
  props<{ oneMouvementIntrant: IMouvementIntrant }>(),
)

/**
 * Actions pour la récupération de tous les mouvements d'intrants
 */
export const getMouvementIntrants = createAction(
  `${prefix} Get All MouvementIntrants`,
)

export const getMouvementIntrantsSuccess = createAction(
  `${getMouvementIntrants.type} Success`,
  props<{ mouvementIntrants: IMouvementIntrant[] }>(),
)

/**
 * Actions pour la récupération des mouvements d'intrants avec filtres
 */
export const getAllMouvementIntrantWithFilters = createAction(
  `${prefix} Get MouvementIntrants With Filters`,
  props<{ filter: any }>(),
)

export const getAllMouvementIntrantWithFiltersSuccess = createAction(
  `${getAllMouvementIntrantWithFilters.type} Success`,
  props<{ mouvementIntrantWithFilters: IMouvementIntrant[] }>(),
)

/**
 * Actions pour la récupération des identifiants avec filtres
 */
export const getAllIdentifiantsWithFilters = createAction(
  `${prefix} Get Identifiants With Filters`,
  props<{ filter: any }>(),
)

export const getAllIdentifiantsWithFiltersSuccess = createAction(
  `${getAllIdentifiantsWithFilters.type} Success`,
  props<{ identifiantsWithFilters: IIdentifiant[] }>(),
)

/**
 * Actions pour la création d'un nouveau mouvement d'intrant
 */
export const createMouvementIntrant = createAction(
  `${prefix} Create MouvementIntrant`,
  props<{ mouvementIntrant: IMouvementIntrant }>(),
)

export const createMouvementIntrantSuccess = createAction(
  `${createMouvementIntrant.type} Success`,
  props<{ mouvementIntrant: IMouvementIntrant }>(),
)

/**
 * Actions pour la mise à jour d'un mouvement d'intrant existant
 */
export const updateMouvementIntrant = createAction(
  `${prefix} Update MouvementIntrant`,
  props<{ mouvementIntrant: IMouvementIntrant }>(),
)

export const updateMouvementIntrantSuccess = createAction(
  `${updateMouvementIntrant.type} Success`,
  props<{ mouvementIntrant: IMouvementIntrant }>(),
)

/**
 * Actions pour la suppression d'un mouvement d'intrant
 */
export const deleteMouvementIntrant = createAction(
  `${prefix} Delete MouvementIntrant`,
  props<{ mouvementIntrant: IMouvementIntrant }>(),
)

export const deleteMouvementIntrantSuccess = createAction(
  `${deleteMouvementIntrant.type} Success`,
  props<{ mouvementIntrant: IMouvementIntrant }>(),
)

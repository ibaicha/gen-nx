import { createAction, props } from '@ngrx/store'
import {
  IAnnee,
  ICampagne,
  IFormeJuridique,
  ILocalite,
  IPoint,
  ISaison,
  IVariete,
} from '@shared-models'

/**
 * Préfixe pour toutes les actions liées aux constantes
 */
const prefix = '[Constante]'

/**
 * Actions pour charger les constantes
 * Ces actions sont utilisées pour charger les données initiales
 * et pour gérer les succès ou les échecs de la récupération des données
 *
 * @param {any} annees - Liste des annees
 * @param {any} saisons - Liste des saisons
 * @param {any} campagnes - Liste des campagnes
 * @param {any} formeJuridiques - Liste des formes juridiques
 * @param {any} localites - Liste des localites
 * @param {any} varietes - Liste des varietes
 * @param {any} points - Liste des points
 * @param {any} error - Erreur lors du chargement des données
 * @param {any} isLoading - Indicateur de chargement
 * @param {any} isLoaded - Indicateur de chargement
 * @param {any} isError - Indicateur d'erreur
 * @param {any} isSuccess - Indicateur de succès
 */

export const loadConstante = createAction('[Constante] Load')

export const loadConstanteSuccess = createAction(
  `${prefix} Load All Success`,
  props<{
    annees: IAnnee[]
    saisons: ISaison[]
    campagnes: ICampagne[]
    formeJuridiques: IFormeJuridique[]
    localites: ILocalite[]
    varietes: IVariete[]
    points: IPoint[]
  }>(),
)
export const loadConstanteFailure = createAction(
  `${prefix} Load All Failure`,
  props<{ error: any }>(),
)

/**
 * Import de l'interface ISaison depuis le fichier saison.interface
 */

import { ISaison } from '@shared-models'

/**
 * Interface définissant l'état des saisons dans le store
 * @interface ISaisonState
 * @property {ISaison[]} saisons - Tableau contenant les saisons
 * @property {boolean} isLoading - Indicateur de chargement
 */
export interface ISaisonState {
  saisons: ISaison[]
  isLoading: boolean
}

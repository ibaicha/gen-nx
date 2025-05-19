/**
 * Import de l'interface IVariete depuis le fichier filiere.interface
 */

import { IVariete } from '@shared-models'

/**
 * Interface définissant l'état des variétés dans le store
 * @interface IVarieteState
 * @property {IVariete[]} varietes - Tableau contenant les variétés
 * @property {boolean} isLoading - Indicateur de chargement
 */
export interface IVarieteState {
  varietes: IVariete[]
  isLoading: boolean
}

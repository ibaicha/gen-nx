/**
 * Import de l'interface IBobo depuis le fichier bobo.interface
 */

import { IBobo } from '../../interfaces/bobo.interface'

/**
 * Interface définissant l'état des bobos dans le store
 * @interface IBoboState
 * @property {IBobo[]} bobos - Tableau contenant les bobos
 * @property {boolean} isLoading - Indicateur de chargement
 */
export interface IBoboState {
  bobos: IBobo[]
  isLoading: boolean
}

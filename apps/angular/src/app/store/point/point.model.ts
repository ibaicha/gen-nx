/**
 * Import de l'interface IPoint depuis le fichier pays.interface
 */

import { IPoint } from "@shared-models"


/**
 * Interface définissant l'état des points dans le store
 * @interface IPointState
 * @property {IPoint[]} points - Tableau contenant les points
 * @property {boolean} isLoading - Indicateur de chargement
 */
export interface IPointState {
  points: IPoint[]
  isLoading: boolean
}

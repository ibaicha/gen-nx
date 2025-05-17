/**
 * Import de l'interface ILocalite depuis le fichier localite.interface
 */

import { ILocalite } from "@shared-models"


/**
 * Interface définissant l'état des localites dans le store
 * @interface ILocaliteState
 * @property {ILocalite[]} localites - Tableau contenant les localites
 * @property {boolean} isLoading - Indicateur de chargement
 */
export interface ILocaliteState {
  localites: ILocalite[]
  isLoading: boolean
}

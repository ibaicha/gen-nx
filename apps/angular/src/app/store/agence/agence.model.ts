/**
 * Import de l'interface IAgence depuis le fichier agence.interface
 */

import { IAgence } from "@shared-models"


/**
 * Interface définissant l'état des sociétés dans le store
 * @interface IAgenceState
 * @property {IAgence[]} agences - Tableau contenant les sociétés
 * @property {boolean} isLoading - Indicateur de chargement
 */
export interface IAgenceState {
  agences: IAgence[]
  isLoading: boolean
}

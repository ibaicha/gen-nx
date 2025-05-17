/**
 * Import de l'interface IPointAgence depuis le fichier point-agence.interface
 */

import { IPointAgence } from "@shared-models"


/**
 * Interface définissant l'état des points d'agence dans le store
 * @interface IPointAgenceState
 * @property {IPointAgence[]} pointAgences - Tableau contenant les points d'agence
 * @property {boolean} isLoading - Indicateur de chargement
 */
export interface IPointAgenceState {
  pointAgences: IPointAgence[]
  isLoading: boolean
}

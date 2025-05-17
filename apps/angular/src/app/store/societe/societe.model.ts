/**
 * Import de l'interface ISociete depuis le fichier societe.interface
 */

import { ISociete } from "@shared-models"

 

/**
 * Interface définissant l'état des sociétés dans le store
 * @interface ISocieteState
 * @property {ISociete[]} societes - Tableau contenant les sociétés
 * @property {boolean} isLoading - Indicateur de chargement
 */
export interface ISocieteState {
  societes: ISociete[]
  isLoading: boolean
}

/**
 * Import de l'interface IFormeJuridique depuis le fichier formeJuridique.interface
 */

import { IFormeJuridique } from '@shared-models'

/**
 * Interface définissant l'état des formeJuridiques dans le store
 * @interface IFormeJuridiqueState
 * @property {IFormeJuridique[]} formeJuridiques - Tableau contenant les formeJuridiques
 * @property {boolean} isLoading - Indicateur de chargement
 */
export interface IFormeJuridiqueState {
  formeJuridiques: IFormeJuridique[]
  isLoading: boolean
}

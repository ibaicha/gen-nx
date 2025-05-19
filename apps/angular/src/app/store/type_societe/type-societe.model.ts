/**
 * Import de l'interface ITypeSociete depuis le fichier type-societe.interface
 */

import { ITypeSociete } from '@shared-models'

/**
 * Interface définissant l'état des types de sociétés dans le store
 * @interface ITypeSocieteState
 * @property {ITypeSociete[]} typeSocietes - Tableau contenant les types de sociétés
 * @property {boolean} isLoading - Indicateur de chargement
 */
export interface ITypeSocieteState {
  typeSocietes: ITypeSociete[]
  isLoading: boolean
}

/**
 * Import de l'interface IProduit depuis le fichier filiere.interface
 */

import { IProduit } from "@shared-models"

 

/**
 * Interface définissant l'état des produits dans le store
 * @interface IProduitState
 * @property {IProduit[]} produits - Tableau contenant les produits
 * @property {boolean} isLoading - Indicateur de chargement
 */
export interface IProduitState {
  produits: IProduit[]
  isLoading: boolean
}

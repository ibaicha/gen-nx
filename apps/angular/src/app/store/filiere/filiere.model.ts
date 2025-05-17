import { IFiliere } from "@shared-models"

 

/**
 * Interface définissant l'état du store pour les filières
 */
export interface IFiliereState {
  /** Liste des filières */
  filieres: IFiliere[]
  /** Indicateur de chargement */
  isLoading: boolean
}

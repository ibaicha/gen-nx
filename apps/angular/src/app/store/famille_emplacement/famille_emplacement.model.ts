import { IFamilleEmplacement } from "@shared-models"


/**
 * Interface définissant l'état du store pour les familles d'emplacements
 */
export interface IFamilleEmplacementState {
  /** Liste des familles d'emplacements */
  familleEmplacements: IFamilleEmplacement[]
  /** Indicateur de chargement */
  isLoading: boolean
}

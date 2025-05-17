import { ICampagne } from "@shared-models"

 

/**
 * Interface définissant l'état du store pour les campagnes
 */
export interface ICampagneState {
  /** Liste des campagnes */
  campagnes: ICampagne[]
  /** Indicateur de chargement */
  isLoading: boolean
}

import { IAgenceOp } from '@shared-models'

/**
 * Interface définissant l'état du store pour les crédits
 */
export interface IAgenceOpState {
  /** Liste des crédits standards */
  agenceOps: IAgenceOp[]

  /** Liste des crédits personnalisés */
  creditsAgencesWithFilters: IAgenceOp[]

  /** Indicateur de chargement */
  isLoading: boolean
}

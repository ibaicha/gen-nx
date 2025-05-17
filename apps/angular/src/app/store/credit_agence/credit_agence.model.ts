import { ICreditAgence } from '@shared-models'

/**
 * Interface définissant l'état du store pour les crédits
 */
export interface ICreditAgenceState {
  /** Liste des crédits standards */
  creditAgences: ICreditAgence[]

  /** Liste des crédits personnalisés */
  creditsAgencesWithFilters: ICreditAgence[]

  /** Indicateur de chargement */
  isLoading: boolean
}

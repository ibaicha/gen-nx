import { ICreditCustom } from '../../../interfaces/credit.interface'

/**
 * Interface définissant l'état du store pour les crédits personnalisés
 */
export interface ICreditCustomState {
  /** Liste des crédits personnalisés */
  creditCustoms: ICreditCustom[]
  /** Indicateur de chargement */
  isLoading: boolean
}

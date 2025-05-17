import { IIdentifiant } from '../../interfaces/identifiant.interface'

/**
 * Interface définissant l'état du store pour les identifiants
 */
export interface IIdentifiantState {
  /** Liste complète des identifiants */
  identifiants: IIdentifiant[]
  /** Liste des identifiants filtrés */
  identifiantWithFilters: IIdentifiant[] 
  /** Indicateur de chargement */
  isLoading: boolean
}

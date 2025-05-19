import { IOp } from '@shared-models'

/**
 * Interface définissant l'état du store pour les clients
 */
export interface IClientState {
  /** Liste des clients */
  clients: IOp[]

  /** Indicateur de chargement */
  isLoading: boolean
}

import { IMouvementIntrant } from '../../interfaces/mouvement-intrant.interface'

/**
 * Interface définissant l'état du store pour les mouvements d'intrants
 */
export interface IMouvementIntrantState {
  /** Liste complète des mouvements d'intrants */
  mouvementIntrants: IMouvementIntrant[]

  /** Liste des mouvements d'intrants filtrés */
  mouvementIntrantWithFilters: IMouvementIntrant[]

  /** Indicateur de chargement */
  isLoading: boolean
}

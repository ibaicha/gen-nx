import { IMouvementStockage } from '../../interfaces/credit.interface'

/**
 * Interface définissant l'état du store pour les mouvements de stockage
 */
export interface IMouvementStockageState {
  /** Liste complète des mouvements de stockage */
  mouvementStockages: IMouvementStockage[]

  /** Liste des mouvements de stockage filtrés par produit et campagne */
  mouvementStockagesProduitCampagne: IMouvementStockage[]

  /** Liste des mouvements de stockage filtrés par opération, produit et campagne */
  mouvementStockagesOpProduitCampagne: IMouvementStockage[]

  /** Indicateur de chargement */
  isLoading: boolean
}

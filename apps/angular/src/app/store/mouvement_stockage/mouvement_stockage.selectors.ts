import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IMouvementStockageState } from './mouvement_stockage.model'

/**
 * Sélecteur de base pour l'état des mouvements de stockage
 */
export const selectMouvementStockageState = createFeatureSelector<IMouvementStockageState>('mouvementStockage')

/**
 * Sélecteurs dérivés pour les différentes parties de l'état
 */

/**
 * Sélecteur pour obtenir la liste complète des mouvements de stockage
 */
export const selectMouvementStockagesList = createSelector(
  selectMouvementStockageState,
  (state) => state.mouvementStockages
)

/**
 * Sélecteur pour obtenir l'état de chargement
 */
export const selectMouvementStockageIsLoading = createSelector(
  selectMouvementStockageState,
  (state) => state.isLoading
)

/**
 * Sélecteur pour obtenir la liste des mouvements de stockage filtrés par produit et campagne
 */
export const selectMouvementStockagesProduitCampagneList = createSelector(
  selectMouvementStockageState,
  (state) => state.mouvementStockagesProduitCampagne
)

/**
 * Sélecteur pour obtenir la liste des mouvements de stockage filtrés par opération, produit et campagne
 */
export const selectMouvementStockagesOpProduitCampagneList = createSelector(
  selectMouvementStockageState,
  (state) => state.mouvementStockagesOpProduitCampagne
)

/**
 * Sélecteur pour obtenir un mouvement de stockage par son ID
 * @param itemId - ID du mouvement de stockage à rechercher
 */
export const selectMouvementStockageById = (itemId: number) => createSelector(
  selectMouvementStockageState,
  (state) => state.mouvementStockages.find((item) => item.id === itemId)
)

// Note: Le sélecteur commenté selectMouvementStockagesListFromExploitation a été retiré
// car il n'est pas utilisé actuellement et peut être réimplémenté si nécessaire

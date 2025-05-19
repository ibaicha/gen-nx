import { Action, createReducer, on } from '@ngrx/store'
import * as fromMouvementStockages from './index'
import { IMouvementStockageState } from './mouvement_stockage.model'

/**
 * État initial du reducer des mouvements de stockage
 */
export const initialMouvementStockageState: IMouvementStockageState = {
  mouvementStockages: [],
  mouvementStockagesProduitCampagne: [],
  mouvementStockagesOpProduitCampagne: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des mouvements de stockage
 */
const reducer = createReducer<IMouvementStockageState>(
  initialMouvementStockageState,

  /**
   * Gestion des actions de récupération d'un mouvement de stockage
   */
  on(fromMouvementStockages.getMouvementStockage, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromMouvementStockages.getMouvementStockageSuccess,
    (state, { oneMouvementStockage }) => ({
      ...state,
      isLoading: false,
      oneMouvementStockage,
    }),
  ),

  /**
   * Gestion des actions de récupération de tous les mouvements de stockage
   */
  on(fromMouvementStockages.getMouvementStockages, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromMouvementStockages.getMouvementStockagesSuccess,
    (state, { mouvementStockages }) => ({
      ...state,
      isLoading: false,
      mouvementStockages,
    }),
  ),

  /**
   * Gestion des actions de récupération filtrée par produit et campagne
   */
  on(
    fromMouvementStockages.getAllMouvementStockagesProduitCampagne,
    (state) => ({
      ...state,
      isLoading: true,
    }),
  ),

  on(
    fromMouvementStockages.getAllMouvementStockagesProduitCampagneSuccess,
    (state, { mouvementStockagesProduitCampagne }) => ({
      ...state,
      isLoading: false,
      mouvementStockagesProduitCampagne,
    }),
  ),

  /**
   * Gestion des actions de récupération filtrée par opération, produit et campagne
   */
  on(
    fromMouvementStockages.getAllMouvementStockagesOpProduitCampagne,
    (state) => ({
      ...state,
      isLoading: true,
    }),
  ),

  on(
    fromMouvementStockages.getAllMouvementStockagesOpProduitCampagneSuccess,
    (state, { mouvementStockagesOpProduitCampagne }) => ({
      ...state,
      isLoading: false,
      mouvementStockagesOpProduitCampagne,
    }),
  ),

  /**
   * Gestion des actions de création
   */
  on(fromMouvementStockages.createMouvementStockage, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromMouvementStockages.createMouvementStockageSuccess,
    (state, { mouvementStockage }) => ({
      ...state,
      mouvementStockages: [...state.mouvementStockages, mouvementStockage],
      isLoading: false,
    }),
  ),

  /**
   * Gestion des actions de mise à jour
   */
  on(fromMouvementStockages.updateMouvementStockage, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromMouvementStockages.updateMouvementStockageSuccess,
    (state, { mouvementStockage }) => ({
      ...state,
      mouvementStockages: state.mouvementStockages.map((item) =>
        item.id === mouvementStockage.id ? mouvementStockage : item,
      ),
      isLoading: false,
    }),
  ),

  /**
   * Gestion des actions de suppression
   */
  on(fromMouvementStockages.deleteMouvementStockage, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    fromMouvementStockages.deleteMouvementStockageSuccess,
    (state, { mouvementStockage }) => ({
      ...state,
      mouvementStockages: state.mouvementStockages.filter(
        (item) => item.id !== mouvementStockage.id,
      ),
      isLoading: false,
    }),
  ),
)

/**
 * Fonction reducer exportée pour la configuration du store
 */
export function mouvementStockageReducer(
  state = initialMouvementStockageState,
  actions: Action,
): IMouvementStockageState {
  return reducer(state, actions)
}

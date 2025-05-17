import { Action, createReducer, on } from '@ngrx/store'
import { IProduitState } from './produit.model'
import * as fromProduits from './index'

/**
 * État initial du store des produits
 */
export const initialProduitState: IProduitState = {
  produits: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des produits
 * Gère les différentes actions et leurs effets sur l'état
 */
const reducer = createReducer<IProduitState>(
  initialProduitState,

  // Actions de lecture
  on(fromProduits.getProduit, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(fromProduits.getProduitSuccess, (state, { oneProduit }) => ({
    ...state,
    isLoading: false,
    oneProduit,
  })),
  on(fromProduits.getProduits, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(fromProduits.getProduitsSuccess, (state, { produits }) => ({
    ...state,
    isLoading: false,
    produits,
  })),

  // Actions de création
  on(fromProduits.createProduit, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(fromProduits.createProduitSuccess, (state, { produit }) => ({
    ...state,
    produits: [...state.produits, produit],
    isLoading: false,
  })),

  // Actions de mise à jour
  on(fromProduits.updateProduit, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(fromProduits.updateProduitSuccess, (state, { produit }) => ({
    ...state,
    produits: state.produits.map((p) => (p.id === produit.id ? produit : p)),
    isLoading: false,
  })),

  // Actions de suppression
  on(fromProduits.deleteProduit, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(fromProduits.deleteProduitSuccess, (state, { produit }) => ({
    ...state,
    produits: state.produits.filter((p) => p.id !== produit.id),
    isLoading: false,
  })),
)

/**
 * Fonction reducer exportée
 * @param state - État actuel (utilise l'état initial par défaut)
 * @param actions - Action à traiter
 * @returns Nouvel état après application de l'action
 */
export function produitReducer(
  state = initialProduitState,
  actions: Action,
): IProduitState {
  return reducer(state, actions)
}

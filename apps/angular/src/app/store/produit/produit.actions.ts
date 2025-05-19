import { createAction, props } from '@ngrx/store'
import { IProduit } from '@shared-models'

/**
 * Configuration des actions pour la gestion des produits
 */

// Préfixe commun pour toutes les actions
const prefix = '[Produits]'

/**
 * Actions CRUD pour la gestion des produits
 * Chaque action a sa version success correspondante
 */

// Lecture d'un produit unique
export const getProduit = createAction(
  `${prefix} Get Single`,
  props<{ id: number }>(),
)
export const getProduitSuccess = createAction(
  `${prefix} Get Single Success`,
  props<{ oneProduit: IProduit }>(),
)

// Lecture de tous les produits
export const getProduits = createAction(`${prefix} Get All`)
export const getProduitsSuccess = createAction(
  `${prefix} Get All Success`,
  props<{ produits: IProduit[] }>(),
)

// Création d'un nouveau produit
export const createProduit = createAction(
  `${prefix} Create`,
  props<{ produit: IProduit }>(),
)
export const createProduitSuccess = createAction(
  `${prefix} Create Success`,
  props<{ produit: IProduit }>(),
)

// Mise à jour d'un produit existant
export const updateProduit = createAction(
  `${prefix} Update`,
  props<{ produit: IProduit }>(),
)
export const updateProduitSuccess = createAction(
  `${prefix} Update Success`,
  props<{ produit: IProduit }>(),
)

// Suppression d'un produit
export const deleteProduit = createAction(
  `${prefix} Delete`,
  props<{ produit: IProduit }>(),
)
export const deleteProduitSuccess = createAction(
  `${prefix} Delete Success`,
  props<{ produit: IProduit }>(),
)

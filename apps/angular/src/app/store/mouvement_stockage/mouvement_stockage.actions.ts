import { createAction, props } from '@ngrx/store'
import { IMouvementStockage } from '../../interfaces/credit.interface'

/**
 * Préfixe pour toutes les actions liées aux mouvements de stockage
 */
const prefix = '[MouvementStockages]'

// ========== ACTIONS DE LECTURE ==========

/**
 * Actions pour la récupération d'un mouvement de stockage spécifique par son ID
 */
export const getMouvementStockage = createAction(
  `${prefix} Get Single MouvementStockage`,
  props<{ id: number }>(),
)

export const getMouvementStockageSuccess = createAction(
  `${getMouvementStockage.type} Success`,
  props<{ oneMouvementStockage: IMouvementStockage }>(),
)

/**
 * Actions pour la récupération de la liste complète des mouvements de stockage
 */
export const getMouvementStockages = createAction(
  `${prefix} Get All MouvementStockages`,
)

export const getMouvementStockagesSuccess = createAction(
  `${getMouvementStockages.type} Success`,
  props<{ mouvementStockages: IMouvementStockage[] }>(),
)

/**
 * Actions pour la récupération filtrée par produit et campagne
 */
export const getAllMouvementStockagesProduitCampagne = createAction(
  `${prefix} Get MouvementStockages By Produit And Campagne`,
  props<{
    produitId: number
    anneeId: number
    saisonId: number
  }>(),
)

export const getAllMouvementStockagesProduitCampagneSuccess = createAction(
  `${getAllMouvementStockagesProduitCampagne.type} Success`,
  props<{ mouvementStockagesProduitCampagne: IMouvementStockage[] }>(),
)

/**
 * Actions pour la récupération filtrée par OP, produit et campagne
 */
export const getAllMouvementStockagesOpProduitCampagne = createAction(
  `${prefix} Get MouvementStockages By Op Produit And Campagne`,
  props<{
    opId: number
    produitId: number
    anneeId: number
    saisonId: number
  }>(),
)

export const getAllMouvementStockagesOpProduitCampagneSuccess = createAction(
  `${getAllMouvementStockagesOpProduitCampagne.type} Success`,
  props<{ mouvementStockagesOpProduitCampagne: IMouvementStockage[] }>(),
)

// ========== ACTIONS DE MODIFICATION ==========

/**
 * Actions pour la création d'un nouveau mouvement de stockage
 */
export const createMouvementStockage = createAction(
  `${prefix} Create MouvementStockage`,
  props<{ mouvementStockage: IMouvementStockage }>(),
)

export const createMouvementStockageSuccess = createAction(
  `${createMouvementStockage.type} Success`,
  props<{ mouvementStockage: IMouvementStockage }>(),
)

/**
 * Actions pour la mise à jour d'un mouvement de stockage existant
 */
export const updateMouvementStockage = createAction(
  `${prefix} Update MouvementStockage`,
  props<{ mouvementStockage: IMouvementStockage }>(),
)

export const updateMouvementStockageSuccess = createAction(
  `${updateMouvementStockage.type} Success`,
  props<{ mouvementStockage: IMouvementStockage }>(),
)

/**
 * Actions pour la suppression d'un mouvement de stockage
 */
export const deleteMouvementStockage = createAction(
  `${prefix} Delete MouvementStockage`,
  props<{ mouvementStockage: IMouvementStockage }>(),
)

export const deleteMouvementStockageSuccess = createAction(
  `${deleteMouvementStockage.type} Success`,
  props<{ mouvementStockage: IMouvementStockage }>(),
)

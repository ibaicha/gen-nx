import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromProduits from './index'
import { ProduitService } from '../../services/produit.service'
import { IProduit } from '@shared-models'
 

/**
 * Effets pour la gestion des produits
 * Gère les effets secondaires des actions liées aux produits
 */
@Injectable()
export class ProduitEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly produitService: ProduitService,
  ) {}

  /**
   * Effet pour récupérer tous les produits
   * Déclenché par l'action getProduits
   */
  getProduits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProduits.getProduits.type),
      switchMap(() => this.produitService.getProduits()),
      map((produits: IProduit[]) => fromProduits.getProduitsSuccess({ produits }))
    )
  )

  /**
   * Effet pour créer un nouveau produit
   * Déclenché par l'action createProduit
   */
  createProduit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProduits.createProduit),
      switchMap(({ produit }) => this.produitService.create(produit)),
      map((produit: IProduit) => fromProduits.createProduitSuccess({ produit }))
    )
  )

  /**
   * Effet pour mettre à jour un produit existant
   * Déclenché par l'action updateProduit
   */
  updateProduit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProduits.updateProduit),
      switchMap(({ produit }) => this.produitService.update(produit)), 
      map((produit: IProduit) => fromProduits.updateProduitSuccess({ produit }))
    )
  )

  /**
   * Effet pour supprimer un produit
   * Déclenché par l'action deleteProduit
   */
  deleteProduit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProduits.deleteProduit),
      switchMap(({ produit }) => this.produitService.delete(produit)),
      map((produit: IProduit) => fromProduits.deleteProduitSuccess({ produit }))
    )
  )
}

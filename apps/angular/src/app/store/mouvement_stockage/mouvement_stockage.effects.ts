import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'

import * as fromMouvementStockages from './index'
import { IMouvementStockage } from '../../interfaces/credit.interface'
import { MouvementStockageService } from '../../services/mouvement-stockage.service'

/**
 * Effets pour la gestion des mouvements de stockage
 * Gère les effets secondaires des actions liées aux mouvements de stockage
 */
@Injectable()
export class MouvementStockageEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly mouvementStockageService: MouvementStockageService,
  ) {}

  /**
   * Effet pour récupérer tous les mouvements de stockage
   * Déclenché par l'action getMouvementStockages
   */
  getMouvementStockages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMouvementStockages.getMouvementStockages.type),
      switchMap(() => this.mouvementStockageService.getMouvementStockages()),
      map((mouvementStockages: IMouvementStockage[]) =>
        fromMouvementStockages.getMouvementStockagesSuccess({ mouvementStockages }),
      ),
    ),
  )

  /**
   * Effet pour récupérer les mouvements de stockage filtrés par produit et campagne
   * Déclenché par l'action getAllMouvementStockagesProduitCampagne
   */
  getAllMouvementStockagesProduitCampagne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMouvementStockages.getAllMouvementStockagesProduitCampagne.type),
      switchMap(({ produitId, anneeId, saisonId }) =>
        this.mouvementStockageService.getAllMouvementStockProduitCampagne(
          produitId,
          anneeId,
          saisonId,
        ),
      ),
      map((mouvementStockagesProduitCampagne: IMouvementStockage[]) =>
        fromMouvementStockages.getAllMouvementStockagesProduitCampagneSuccess({
          mouvementStockagesProduitCampagne,
        }),
      ),
    ),
  )

  /**
   * Effet pour récupérer les mouvements de stockage filtrés par OP, produit et campagne
   * Déclenché par l'action getAllMouvementStockagesOpProduitCampagne
   */
  getAllMouvementStockagesOpProduitCampagne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMouvementStockages.getAllMouvementStockagesOpProduitCampagne.type),
      switchMap(({ opId, produitId, anneeId, saisonId }) =>
        this.mouvementStockageService.getAllMouvementStockOpProduitCampagne(
          opId,
          produitId,
          anneeId,
          saisonId,
        ),
      ),
      map((mouvementStockagesOpProduitCampagne: IMouvementStockage[]) =>
        fromMouvementStockages.getAllMouvementStockagesOpProduitCampagneSuccess({
          mouvementStockagesOpProduitCampagne,
        }),
      ),
    ),
  )

  /**
   * Effet pour créer un nouveau mouvement de stockage
   * Déclenché par l'action createMouvementStockage
   */
  createMouvementStockage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMouvementStockages.createMouvementStockage),
      switchMap(({ mouvementStockage }) =>
        this.mouvementStockageService.create(mouvementStockage),
      ),
      map((mouvementStockage: IMouvementStockage) =>
        fromMouvementStockages.createMouvementStockageSuccess({ mouvementStockage }),
      ),
    ),
  )

  /**
   * Effet pour mettre à jour un mouvement de stockage existant
   * Déclenché par l'action updateMouvementStockage
   */
  updateMouvementStockage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMouvementStockages.updateMouvementStockage),
      switchMap(({ mouvementStockage }) =>
        this.mouvementStockageService.update(mouvementStockage),
      ),
      map((mouvementStockage: IMouvementStockage) =>
        fromMouvementStockages.updateMouvementStockageSuccess({ mouvementStockage }),
      ),
    ),
  )

  /**
   * Effet pour supprimer un mouvement de stockage
   * Déclenché par l'action deleteMouvementStockage
   */
  deleteMouvementStockage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMouvementStockages.deleteMouvementStockage),
      switchMap(({ mouvementStockage }) =>
        this.mouvementStockageService.delete(mouvementStockage),
      ),
      map((mouvementStockage: IMouvementStockage) =>
        fromMouvementStockages.deleteMouvementStockageSuccess({ mouvementStockage }),
      ),
    ),
  )
}

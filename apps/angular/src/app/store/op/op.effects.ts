import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromOps from './index'
import { OpService } from '../../services/op.service'
import { CreateOpPortefeuilleDto, IOp } from '@shared-models'

/**
 * Effets pour la gestion des opérations (OPs)
 * Gère les effets secondaires des actions liées aux OPs
 */
@Injectable()
export class OpEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly opService: OpService,
  ) {}

  /**
   * Effet pour récupérer toutes les OPs
   * Déclenché par l'action getOps
   */
  getOps$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOps.getOps.type),
      switchMap(() => this.opService.getAll()),
      map((ops: IOp[]) => fromOps.getOpsSuccess({ ops })),
    ),
  )

  /**
   * Effet pour récupérer les ops avec filtres
   * Déclenché par l'action getOpsWithFilters
   * 
   getOpsWithFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOps.getOpsWithFilters.type), // Écoute l'action getOpsWithFilters
      switchMap(({ filter }) =>
        this.opService.getOpsWithFilters(filter).pipe(
          map((opsWithFilters: IOp[]) =>
            fromOps.getOpsWithFiltersSuccess({ opsWithFilters }),
          ),
          // Gestion des erreurs
          map((error) => fromOps.getOpsWithFiltersFailure({ error })),
        ),
      ),
    ),
  )
   */
  getOpsWithFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOps.getOpsWithFilters.type), // Écoute l'action getOpsWithFilters
      switchMap(({ filter }) => this.opService.getOpsWithFilters(filter)),
      map(
        (opsWithFilters: IOp[]) =>
          fromOps.getOpsWithFiltersSuccess({ opsWithFilters }),
        // Gestion des erreurs
      ),
    ),
  )

  /**
   * Effet pour récupérer les OPs personnalisées d'une agence
   * Déclenché par l'action getAllOpsCustomFromAgence
   
  getAllOpsCustomFromAgence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOps.getAllOpsCustomFromAgence.type),
      switchMap(({ agenceId }) =>
        this.opService.getAllOpsCustomFromAgence(agenceId),
      ),
      map((opsCustomFromAgences: IOp[]) =>
        fromOps.getAllOpsCustomFromAgenceSuccess({ opsCustomFromAgences }),
      ),
    ),
  )
*/
  /**
   * Effet pour créer une nouvelle OP
   * Déclenché par l'action createOp
   */
  createOp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOps.createOp),
      switchMap(({ op }) => this.opService.create(op)),
      map((op: IOp) => fromOps.createOpSuccess({ op })),
    ),
  )

  /**
   * Effet pour créer une nouvelle OP Portefeuille
   * Déclenché par l'action createOpPortefeuille
   */
  createOpPortefeuille$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOps.createOpPortefeuille),
      switchMap(({ opPortefeuille }) =>
        this.opService.createPorteFeuille(opPortefeuille),
      ),
      map((opPortefeuille: CreateOpPortefeuilleDto) =>
        fromOps.createOpPortefeuilleSuccess({ opPortefeuille }),
      ),
    ),
  )

  /**
   * Effet pour mettre à jour une OP existante
   * Déclenché par l'action updateOp
   */
  updateOp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOps.updateOp),
      switchMap(({ op }) => this.opService.update(op.id, op)),
      map((op: IOp) => fromOps.updateOpSuccess({ op })),
    ),
  )

  /**
   * Effet pour supprimer une OP
   * Déclenché par l'action deleteOp
   
  deleteOp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOps.deleteOp),
      switchMap(({ op }) => this.opService.delete(op)),
      map((op: IOp) => fromOps.deleteOpSuccess({ op })),
    ),
  )
  */

  deleteOp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOps.deleteOp),
      switchMap(({ op }) =>
        this.opService.delete(op).pipe(
          map(() => op), // Return the original op after deletion
        ),
      ),
      map((op: IOp) => fromOps.deleteOpSuccess({ op })),
    ),
  )
}

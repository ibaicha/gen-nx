import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromAgenceOps from './index'
import { IAgenceOp } from '@shared-models'
import { AgenceOpService } from '../../services/agence-op.service'

/**
 * Effets pour la gestion des crédits
 * Gère les effets secondaires des actions liées aux crédits
 */
@Injectable()
export class AgenceOpEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly agenceOpService: AgenceOpService,
  ) {}

  /**
   * Effet pour récupérer tous les crédits
   * Déclenché par l'action getAgenceOps
  
  getAgenceOps$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAgenceOps.getAgenceOps.type),
      switchMap(() => this.agenceOpService.getCreditsAencesWithFilters()),
      map((agenceOps: IAgenceOp[]) =>
        fromAgenceOps.getAgenceOpsSuccess({ agenceOps }),
      ),
    ),
  )
 */
  getCreditsAgencesWithFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAgenceOps.getCreditsAgencesWithFilters.type),
      switchMap(({ filter }) =>
        this.agenceOpService.getCreditsAgencesWithFilters(filter),
      ),
      map(
        (creditsAgencesWithFilters: IAgenceOp[]) =>
          fromAgenceOps.getCreditsAgencesWithFiltersSuccess({
            creditsAgencesWithFilters,
          }),
        //
        /*Gestion des erreurs
        map((error) =>
          fromAgenceOps.getCreditsAgencesWithFiltersFailure({ error }),
        ),
        */
      ),
    ),
  )

  /**
   * Effet pour créer un nouveau crédit
   * Déclenché par l'action createAgenceOp
  
  createAgenceOp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAgenceOps.createAgenceOp),
      switchMap(({ body }) => this.agenceOpService.create(body)),
      map((agenceOp) =>
        fromAgenceOps.createAgenceOpSuccess({ agenceOp }),
      ),
    ),
  )
 */
  /**
   * Effet pour mettre à jour un crédit existant
   * Déclenché par l'action updateAgenceOp
   
  updateAgenceOp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAgenceOps.updateAgenceOp),
      switchMap(({ body }) => this.agenceOpService.update(body)),
      map((agenceOp) =>
        fromAgenceOps.updateAgenceOpSuccess({ agenceOp }),
      ),
    ),
  )
*/
  /**
   * Effet pour supprimer un crédit
   * Déclenché par l'action deleteAgenceOp
  
  deleteAgenceOp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAgenceOps.deleteAgenceOp),
      switchMap(({ body }) => this.agenceOpService.delete(body)),
      map((agenceOp) =>
        fromAgenceOps.deleteAgenceOpSuccess({ agenceOp }),
      ),
    ),
  )
     */
}

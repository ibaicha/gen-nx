import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromMouvementIntrants from './index'
import { MouvementIntrantService } from '../../services/mouvement-intrant.service'
import { IMouvementIntrant } from '../../interfaces/mouvement-intrant.interface'

/**
 * Effets pour la gestion des mouvements d'intrants
 * Gère les effets secondaires des actions liées aux mouvements d'intrants
 */
@Injectable()
export class MouvementIntrantEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly mouvementIntrantService: MouvementIntrantService,
  ) {}

  /**
   * Effet pour récupérer tous les mouvements d'intrants
   * Déclenché par l'action getMouvementIntrants
   */
  getMouvementIntrants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMouvementIntrants.getMouvementIntrants.type),
      switchMap(() => this.mouvementIntrantService.getMouvementIntrants()),
      map((mouvementIntrants: IMouvementIntrant[]) =>
        fromMouvementIntrants.getMouvementIntrantsSuccess({ mouvementIntrants }),
      ),
    ),
  )

  /**
   * Effet pour récupérer les mouvements d'intrants avec filtres
   * Déclenché par l'action getAllMouvementIntrantWithFilters
   */
  getAllMouvementIntrantWithFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMouvementIntrants.getAllMouvementIntrantWithFilters.type),
      switchMap(({ filter }) => 
        this.mouvementIntrantService.getAllMouvementIntrantWithFilters(filter)
      ),
      map((mouvementIntrantWithFilters: IMouvementIntrant[]) =>
        fromMouvementIntrants.getAllMouvementIntrantWithFiltersSuccess({
          mouvementIntrantWithFilters,
        }),
      ),
    ),
  )

  /**
   * Effet pour créer un nouveau mouvement d'intrant
   * Déclenché par l'action createMouvementIntrant
   */
  createMouvementIntrant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMouvementIntrants.createMouvementIntrant),
      switchMap(({ mouvementIntrant }) =>
        this.mouvementIntrantService.create(mouvementIntrant),
      ),
      map((mouvementIntrant: IMouvementIntrant) =>
        fromMouvementIntrants.createMouvementIntrantSuccess({ mouvementIntrant }),
      ),
    ),
  )

  /**
   * Effet pour mettre à jour un mouvement d'intrant existant
   * Déclenché par l'action updateMouvementIntrant
   */
  updateMouvementIntrant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMouvementIntrants.updateMouvementIntrant),
      switchMap(({ mouvementIntrant }) =>
        this.mouvementIntrantService.update(mouvementIntrant),
      ),
      map((mouvementIntrant: IMouvementIntrant) =>
        fromMouvementIntrants.updateMouvementIntrantSuccess({ mouvementIntrant }),
      ),
    ),
  )

  /**
   * Effet pour supprimer un mouvement d'intrant
   * Déclenché par l'action deleteMouvementIntrant
   */
  deleteMouvementIntrant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMouvementIntrants.deleteMouvementIntrant),
      switchMap(({ mouvementIntrant }) =>
        this.mouvementIntrantService.delete(mouvementIntrant),
      ),
      map((mouvementIntrant: IMouvementIntrant) =>
        fromMouvementIntrants.deleteMouvementIntrantSuccess({ mouvementIntrant }),
      ),
    ),
  )
}

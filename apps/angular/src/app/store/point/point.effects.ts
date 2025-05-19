import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromPoints from './index'
import { PointService } from '../../services/point.service'
import { IPoint } from '@shared-models'

/**
 * Effets pour la gestion des points
 * Gère les effets secondaires des actions liées aux points
 */
@Injectable()
export class PointEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly pointService: PointService,
  ) {}

  /**
   * Effet pour récupérer tous les points
   * Déclenché par l'action getPoints
   */
  getPoints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPoints.getPoints.type),
      switchMap(() => this.pointService.getPoints()),
      map((points: IPoint[]) => fromPoints.getPointsSuccess({ points })),
    ),
  )

  /**
   * Effet pour créer un nouveau point
   * Déclenché par l'action createPoint
   */
  createPoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPoints.createPoint),
      switchMap(({ point }) => this.pointService.create(point)),
      map((point: IPoint) => fromPoints.createPointSuccess({ point })),
    ),
  )

  /**
   * Effet pour mettre à jour un point existant
   * Déclenché par l'action updatePoint
   */
  updatePoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPoints.updatePoint),
      switchMap(({ point }) => this.pointService.update(point)),
      map((point: IPoint) => fromPoints.updatePointSuccess({ point })),
    ),
  )

  /**
   * Effet pour supprimer un point
   * Déclenché par l'action deletePoint
   */
  deletePoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPoints.deletePoint),
      switchMap(({ point }) => this.pointService.delete(point)),
      map((point: IPoint) => fromPoints.deletePointSuccess({ point })),
    ),
  )
}

import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromPointAgences from './index'

import { PointAgenceService } from '../../services/point-agence.service'
import { IPointAgence } from '@shared-models'

/**
 * Effets pour la gestion des points d'agence
 * Gère les effets secondaires des actions liées aux points d'agence
 */
@Injectable()
export class PointAgenceEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly pointAgenceService: PointAgenceService,
  ) {}

  /**
   * Effet pour récupérer tous les points d'agence
   * Déclenché par l'action getPointAgences
   */
  getPointAgences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPointAgences.getPointAgences.type),
      switchMap(() => this.pointAgenceService.getpointAgences()),
      map((pointAgences: IPointAgence[]) =>
        fromPointAgences.getPointAgencesSuccess({ pointAgences }),
      ),
    ),
  )

  /**
   * Effet pour créer un nouveau point d'agence
   * Déclenché par l'action createPointAgence
   */
  createPointAgence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPointAgences.createPointAgence),
      switchMap(({ pointAgence }) => this.pointAgenceService.create(pointAgence)),
      map((pointAgence: IPointAgence) =>
        fromPointAgences.createPointAgenceSuccess({ pointAgence }),
      ),
    ),
  )

  /**
   * Effet pour mettre à jour un point d'agence existant
   * Déclenché par l'action updatePointAgence
   */
  updatePointAgence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPointAgences.updatePointAgence),
      switchMap(({ pointAgence }) => this.pointAgenceService.update(pointAgence)),
      map((pointAgence: IPointAgence) =>
        fromPointAgences.updatePointAgenceSuccess({ pointAgence }),
      ),
    ),
  )

  /**
   * Effet pour supprimer un point d'agence
   * Déclenché par l'action deletePointAgence
   */
  deletePointAgence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPointAgences.deletePointAgence),
      switchMap(({ pointAgence }) => this.pointAgenceService.delete(pointAgence)),
      map((pointAgence: IPointAgence) =>
        fromPointAgences.deletePointAgenceSuccess({ pointAgence }),
      ),
    ),
  )
}

import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromBobos from './index'
 
import { IBobo } from '../../interfaces/bobo.interface'
import { BoboService } from '../../services/bobo.service'


/**
 * Effets pour la gestion des bobos
 * Gère les effets secondaires des actions liées aux bobos
 */
@Injectable()
export class BoboEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly boboService: BoboService,
  ) {}

  /**
   * Effet pour récupérer tous les bobos
   * Déclenché par l'action getBobos
   */
  getBobos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromBobos.getBobos.type),
      switchMap(() => this.boboService.getBobos()),
      map((bobos: IBobo[]) => fromBobos.getBobosSuccess({ bobos }))
    )
  )

  /**
   * Effet pour récupérer un bobo spécifique
   * Déclenché par l'action getBobo
   */
  getBobo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromBobos.getBobo),
      switchMap(({ id }) => this.boboService.getBobo(id)),
      map((oneBobo: IBobo) => fromBobos.getBoboSuccess({ oneBobo }))
    )
  )

  /**
   * Effet pour créer un nouveau bobo
   * Déclenché par l'action createBobo
   */
  createBobo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromBobos.createBobo),
      switchMap(({ bobo }) => this.boboService.create(bobo)),
      map((bobo: IBobo) => fromBobos.createBoboSuccess({ bobo }))
    )
  )

  /**
   * Effet pour mettre à jour un bobo existant
   * Déclenché par l'action updateBobo
   */
  updateBobo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromBobos.updateBobo),
      switchMap(({ bobo }) => this.boboService.update(bobo)),
      map((bobo: IBobo) => fromBobos.updateBoboSuccess({ bobo }))
    )
  )

  /**
   * Effet pour supprimer un bobo
   * Déclenché par l'action deleteBobo
   */
  deleteBobo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromBobos.deleteBobo),
      switchMap(({ bobo }) => this.boboService.delete(bobo)),
      map((bobo: IBobo) => fromBobos.deleteBoboSuccess({ bobo }))
    )
  )
}

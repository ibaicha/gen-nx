import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromVarietes from './index'
import { VarieteService } from '../../services/variete.service'
import { IVariete } from '@shared-models'
 

/**
 * Effets pour la gestion des variétés
 * Gère les opérations asynchrones liées aux variétés
 */
@Injectable()
export class VarieteEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly varieteService: VarieteService,
  ) {}

  /**
   * Effet pour récupérer toutes les variétés
   * Déclenché par l'action getVarietes
   */
  getVarietes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromVarietes.getVarietes.type),
      switchMap(() => this.varieteService.getVarietes()),
      map((varietes: IVariete[]) => fromVarietes.getVarietesSuccess({ varietes })),
    ),
  )

  /**
   * Effet pour créer une nouvelle variété
   * Déclenché par l'action createVariete
   */
  createVariete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromVarietes.createVariete),
      switchMap(({ variete }) => this.varieteService.create(variete)),
      map((variete: IVariete) => fromVarietes.createVarieteSuccess({ variete })),
    ),
  )

  /**
   * Effet pour mettre à jour une variété existante
   * Déclenché par l'action updateVariete
   */
  updateVariete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromVarietes.updateVariete), 
      switchMap(({ variete }) => this.varieteService.update(variete)),
      map((variete: IVariete) => fromVarietes.updateVarieteSuccess({ variete })),
    ),
  )

  /**
   * Effet pour supprimer une variété
   * Déclenché par l'action deleteVariete
   */
  deleteVariete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromVarietes.deleteVariete),
      switchMap(({ variete }) => this.varieteService.delete(variete)),
      map((variete: IVariete) => fromVarietes.deleteVarieteSuccess({ variete })),
    ),
  )
}

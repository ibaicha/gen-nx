import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromSaisons from './index'
import { SaisonService } from '../../services/saison.service'
import { ISaison } from '@shared-models'

/**
 * Effets pour la gestion des saisons
 * Gère les effets secondaires des actions liées aux saisons
 */
@Injectable()
export class SaisonEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly saisonService: SaisonService,
  ) {}

  /**
   * Effet pour récupérer toutes les saisons
   * Déclenché par l'action getSaisons
   */
  getSaisons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSaisons.getSaisons.type),
      switchMap(() => this.saisonService.getSaisons()),
      map((saisons: ISaison[]) => fromSaisons.getSaisonsSuccess({ saisons })),
    ),
  )

  /**
   * Effet pour créer une nouvelle saison
   * Déclenché par l'action createSaison
   */
  createSaison$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSaisons.createSaison),
      switchMap(({ saison }) => this.saisonService.create(saison)),
      map((saison: ISaison) => fromSaisons.createSaisonSuccess({ saison })),
    ),
  )

  /**
   * Effet pour mettre à jour une saison existante
   * Déclenché par l'action updateSaison
   */
  updateSaison$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSaisons.updateSaison),
      switchMap(({ saison }) => this.saisonService.update(saison)),
      map((saison: ISaison) => fromSaisons.updateSaisonSuccess({ saison })),
    ),
  )

  /**
   * Effet pour supprimer une saison
   * Déclenché par l'action deleteSaison
   */
  deleteSaison$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSaisons.deleteSaison),
      switchMap(({ saison }) => this.saisonService.delete(saison)),
      map((saison: ISaison) => fromSaisons.deleteSaisonSuccess({ saison })),
    ),
  )
}

import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromLocalites from './index'
import { LocaliteService } from '../../services/localite.service'
import { ILocalite } from '@shared-models'

/**
 * Effets pour la gestion des localites
 * Gère les effets secondaires des actions liées aux localites
 */
@Injectable()
export class LocaliteEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly localiteService: LocaliteService,
  ) {}

  /**
   * Effet pour récupérer toutes les localites
   * Déclenché par l'action getLocalites
   */
  getLocalites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromLocalites.getLocalites.type),
      switchMap(() => this.localiteService.getAll()),
      map((localites: ILocalite[]) =>
        fromLocalites.getLocalitesSuccess({ localites }),
      ),
    ),
  )

  /**
   * Effet pour créer une nouvelle localite
   * Déclenché par l'action createLocalite
   */
  createLocalite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromLocalites.createLocalite),
      switchMap(({ localite }) => this.localiteService.create(localite)),
      map((localite: ILocalite) =>
        fromLocalites.createLocaliteSuccess({ localite }),
      ),
    ),
  )

  /**
   * Effet pour mettre à jour une localite existante
   * Déclenché par l'action updateLocalite
   */
  updateLocalite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromLocalites.updateLocalite),
      switchMap(({ localite }) =>
        this.localiteService.update(localite.id, localite),
      ),
      map((localite: ILocalite) =>
        fromLocalites.updateLocaliteSuccess({ localite }),
      ),
    ),
  )

  /**
   * Effet pour supprimer une localite
   * Déclenché par l'action deleteLocalite
   */
  deleteLocalite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromLocalites.deleteLocalite),
      switchMap(({ localite }) =>
        this.localiteService.delete(localite).pipe(
          map(() => localite), // Return the deleted localite
        ),
      ),
      map((localite: ILocalite) =>
        fromLocalites.deleteLocaliteSuccess({ localite }),
      ),
    ),
  )
}

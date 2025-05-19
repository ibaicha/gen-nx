import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromFilieres from './index'
import { FiliereService } from '../../services/filiere.service'
import { IFiliere } from '@shared-models'

/**
 * Effets pour la gestion des filières
 * Gère les effets secondaires des actions liées aux filières
 */
@Injectable()
export class FiliereEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly filiereService: FiliereService,
  ) {}

  /**
   * Effet pour récupérer toutes les filières
   * Déclenché par l'action getFilieres
   */
  getFilieres$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromFilieres.getFilieres.type),
      switchMap(() => this.filiereService.getFilieres()),
      map((filieres: IFiliere[]) =>
        fromFilieres.getFilieresSuccess({ filieres }),
      ),
    ),
  )

  /**
   * Effet pour créer une nouvelle filière
   * Déclenché par l'action createFiliere
   */
  createFiliere$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromFilieres.createFiliere),
      switchMap(({ filiere }) => this.filiereService.create(filiere)),
      map((filiere: IFiliere) =>
        fromFilieres.createFiliereSuccess({ filiere }),
      ),
    ),
  )

  /**
   * Effet pour mettre à jour une filière existante
   * Déclenché par l'action updateFiliere
   */
  updateFiliere$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromFilieres.updateFiliere),
      switchMap(({ filiere }) => this.filiereService.update(filiere)),
      map((filiere: IFiliere) =>
        fromFilieres.updateFiliereSuccess({ filiere }),
      ),
    ),
  )

  /**
   * Effet pour supprimer une filière
   * Déclenché par l'action deleteFiliere
   */
  deleteFiliere$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromFilieres.deleteFiliere),
      switchMap(({ filiere }) => this.filiereService.delete(filiere)),
      map((filiere: IFiliere) =>
        fromFilieres.deleteFiliereSuccess({ filiere }),
      ),
    ),
  )
}

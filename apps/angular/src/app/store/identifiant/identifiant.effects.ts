import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromIdentifiants from './index'
import { IdentifiantService } from '../../services/identifiant.service'
import { IIdentifiant } from '../../interfaces/identifiant.interface'

/**
 * Effets pour la gestion des identifiants
 * Gère les effets secondaires des actions liées aux identifiants
 */
@Injectable()
export class IdentifiantEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly identifiantService: IdentifiantService,
  ) {}

  /**
   * Effet pour récupérer tous les identifiants
   * Déclenché par l'action getIdentifiants
   */
  getIdentifiants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIdentifiants.getIdentifiants.type),
      switchMap(() => this.identifiantService.getIdentifiants()),
      map((identifiants: IIdentifiant[]) =>
        fromIdentifiants.getIdentifiantsSuccess({ identifiants }),
      ),
    ),
  )

  /**
   * Effet pour récupérer les identifiants avec filtres
   * Déclenché par l'action getAllIdentifiantsWithFilters
   */
  getAllIdentifiantWithFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIdentifiants.getAllIdentifiantsWithFilters.type),
      switchMap(({ filter }) =>
        this.identifiantService.getAllIdentifiantsWithFilters(filter),
      ),
      map((identifiantWithFilters: IIdentifiant[]) =>
        fromIdentifiants.getAllIdentifiantsWithFiltersSuccess({
          identifiantWithFilters,
        }),
      ),
    ),
  )

  /**
   * Effet pour créer un nouvel identifiant
   * Déclenché par l'action createIdentifiant
   */
  createIdentifiant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIdentifiants.createIdentifiant),
      switchMap(({ identifiant }) =>
        this.identifiantService.create(identifiant),
      ),
      map((identifiant: IIdentifiant) =>
        fromIdentifiants.createIdentifiantSuccess({ identifiant }),
      ),
    ),
  )

  /**
   * Effet pour mettre à jour un identifiant existant
   * Déclenché par l'action updateIdentifiant
   */
  updateIdentifiant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIdentifiants.updateIdentifiant),
      switchMap(({ identifiant }) =>
        this.identifiantService.update(identifiant),
      ),
      map((identifiant: IIdentifiant) =>
        fromIdentifiants.updateIdentifiantSuccess({ identifiant }),
      ),
    ),
  )

  /**
   * Effet pour supprimer un identifiant
   * Déclenché par l'action deleteIdentifiant
   */
  deleteIdentifiant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIdentifiants.deleteIdentifiant),
      switchMap(({ identifiant }) =>
        this.identifiantService.delete(identifiant),
      ),
      map((identifiant: IIdentifiant) =>
        fromIdentifiants.deleteIdentifiantSuccess({ identifiant }),
      ),
    ),
  )
}

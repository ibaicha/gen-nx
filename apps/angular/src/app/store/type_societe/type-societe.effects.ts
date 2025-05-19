import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromTypeSocietes from './index'
import { TypeSocieteService } from '../../services/type-societe.service'
import { ITypeSociete } from '@shared-models'

/**
 * Effets pour la gestion des types de sociétés
 * Gère les opérations asynchrones liées aux types de sociétés
 */
@Injectable()
export class TypeSocieteEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly typeSocieteService: TypeSocieteService,
  ) {}

  /**
   * Effet pour récupérer tous les types de sociétés
   * Déclenché par l'action getTypeSocietes
   */
  getTypeSocietes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypeSocietes.getTypeSocietes.type),
      switchMap(() => this.typeSocieteService.getTypeSocietes()),
      map((typeSocietes: ITypeSociete[]) =>
        fromTypeSocietes.getTypeSocietesSuccess({ typeSocietes }),
      ),
    ),
  )

  /**
   * Effet pour créer un nouveau type de société
   * Déclenché par l'action createTypeSociete
   */
  createTypeSociete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypeSocietes.createTypeSociete),
      switchMap(({ typeSociete }) =>
        this.typeSocieteService.create(typeSociete),
      ),
      map((typeSociete: ITypeSociete) =>
        fromTypeSocietes.createTypeSocieteSuccess({ typeSociete }),
      ),
    ),
  )

  /**
   * Effet pour mettre à jour un type de société existant
   * Déclenché par l'action updateTypeSociete
   */
  updateTypeSociete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypeSocietes.updateTypeSociete),
      switchMap(({ typeSociete }) =>
        this.typeSocieteService.update(typeSociete),
      ),
      map((typeSociete: ITypeSociete) =>
        fromTypeSocietes.updateTypeSocieteSuccess({ typeSociete }),
      ),
    ),
  )

  /**
   * Effet pour supprimer un type de société
   * Déclenché par l'action deleteTypeSociete
   */
  deleteTypeSociete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypeSocietes.deleteTypeSociete),
      switchMap(({ typeSociete }) =>
        this.typeSocieteService.delete(typeSociete),
      ),
      map((typeSociete: ITypeSociete) =>
        fromTypeSocietes.deleteTypeSocieteSuccess({ typeSociete }),
      ),
    ),
  )
}

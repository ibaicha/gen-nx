import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromFamilleEmplacements from './index'
import { FamilleEmplacementService } from '../../services/famille-emplacement.service'
import { IFamilleEmplacement } from '@shared-models'

/**
 * Effets pour la gestion des familles d'emplacements
 * Gère les effets secondaires des actions liées aux familles d'emplacements
 */
@Injectable()
export class FamilleEmplacementEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly familleEmplacementService: FamilleEmplacementService,
  ) {}

  /**
   * Effet pour récupérer toutes les familles d'emplacements
   * Déclenché par l'action getFamilleEmplacements
   */
  getFamilleEmplacements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromFamilleEmplacements.getFamilleEmplacements.type),
      switchMap(() => this.familleEmplacementService.getFamilleEmplacements()),
      map((familleEmplacements: IFamilleEmplacement[]) =>
        fromFamilleEmplacements.getFamilleEmplacementsSuccess({
          familleEmplacements,
        }),
      ),
    ),
  )

  /**
   * Effet pour créer une nouvelle famille d'emplacement
   * Déclenché par l'action createFamilleEmplacement
   */
  createFamilleEmplacement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromFamilleEmplacements.createFamilleEmplacement),
      switchMap(({ familleEmplacement }) =>
        this.familleEmplacementService.create(familleEmplacement),
      ),
      map((familleEmplacement: IFamilleEmplacement) =>
        fromFamilleEmplacements.createFamilleEmplacementSuccess({
          familleEmplacement,
        }),
      ),
    ),
  )

  /**
   * Effet pour mettre à jour une famille d'emplacement existante
   * Déclenché par l'action updateFamilleEmplacement
   */
  updateFamilleEmplacement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromFamilleEmplacements.updateFamilleEmplacement),
      switchMap(({ familleEmplacement }) =>
        this.familleEmplacementService.update(familleEmplacement),
      ),
      map((familleEmplacement: IFamilleEmplacement) =>
        fromFamilleEmplacements.updateFamilleEmplacementSuccess({
          familleEmplacement,
        }),
      ),
    ),
  )

  /**
   * Effet pour supprimer une famille d'emplacement
   * Déclenché par l'action deleteFamilleEmplacement
   */
  deleteFamilleEmplacement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromFamilleEmplacements.deleteFamilleEmplacement),
      switchMap(({ familleEmplacement }) =>
        this.familleEmplacementService.delete(familleEmplacement),
      ),
      map((familleEmplacement: IFamilleEmplacement) =>
        fromFamilleEmplacements.deleteFamilleEmplacementSuccess({
          familleEmplacement,
        }),
      ),
    ),
  )
}

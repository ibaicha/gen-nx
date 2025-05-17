import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromCreditAgences from './index'
import { ICreditAgence } from '@shared-models'
import { CreditAgenceService } from '../../services/credit-agence.service'

/**
 * Effets pour la gestion des crédits
 * Gère les effets secondaires des actions liées aux crédits
 */
@Injectable()
export class CreditAgenceEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly creditAgenceService: CreditAgenceService,
  ) {}

  /**
   * Effet pour récupérer tous les crédits
   * Déclenché par l'action getCreditAgences
  
  getCreditAgences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCreditAgences.getCreditAgences.type),
      switchMap(() => this.creditAgenceService.getCreditsAencesWithFilters()),
      map((creditAgences: ICreditAgence[]) =>
        fromCreditAgences.getCreditAgencesSuccess({ creditAgences }),
      ),
    ),
  )
 */
  getCreditsAgencesWithFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCreditAgences.getCreditsAgencesWithFilters.type),
      switchMap(({ filter }) =>
        this.creditAgenceService.getCreditsAgencesWithFilters(filter),
      ),
      map(
        (creditsAgencesWithFilters: ICreditAgence[]) =>
          fromCreditAgences.getCreditsAgencesWithFiltersSuccess({
            creditsAgencesWithFilters,
          }),
        // Gestion des erreurs

        map((error) =>
          fromCreditAgences.getCreditsAgencesWithFiltersFailure({ error }),
        ),
      ),
    ),
  )

  createCreditAgence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCreditAgences.createCreditAgence),
      switchMap(({ body }) =>
        this.creditAgenceService.createCreditAgence(body),
      ),
      map((creditAgence) =>
        fromCreditAgences.createCreditAgenceSuccess({ creditAgence }),
      ),
    ),
  )

  /**
   * Effet pour mettre à jour un crédit existant
   * Déclenché par l'action updateCreditAgence
   
  updateCreditAgence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCreditAgences.updateCreditAgence),
      switchMap(({ body }) => this.creditAgenceService.update(body)),
      map((creditAgence) =>
        fromCreditAgences.updateCreditAgenceSuccess({ creditAgence }),
      ),
    ),
  )
*/
  /**
   * Effet pour supprimer un crédit
   * Déclenché par l'action deleteCreditAgence
  
  deleteCreditAgence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCreditAgences.deleteCreditAgence),
      switchMap(({ body }) => this.creditAgenceService.delete(body)),
      map((creditAgence) =>
        fromCreditAgences.deleteCreditAgenceSuccess({ creditAgence }),
      ),
    ),
  )
     */
}

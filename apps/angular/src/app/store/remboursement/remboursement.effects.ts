import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromRemboursements from './index'
import { RemboursementService } from '../../services/remboursement.service'
import { IRemboursement } from '../../interfaces/credit.interface'

/**
 * Effets pour la gestion des remboursements
 * Gère les effets secondaires des actions liées aux remboursements
 */
@Injectable()
export class RemboursementEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly remboursementService: RemboursementService,
  ) {}

  /**
   * Effet pour récupérer tous les remboursements
   * Déclenché par l'action getRemboursements
   */
  getRemboursements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRemboursements.getRemboursements.type),
      switchMap(() => this.remboursementService.getRemboursements()),
      map((remboursements: IRemboursement[]) =>
        fromRemboursements.getRemboursementsSuccess({ remboursements })
      )
    )
  )

  /**
   * Effet pour créer un nouveau remboursement
   * Déclenché par l'action createRemboursement
   */
  createRemboursement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRemboursements.createRemboursement),
      switchMap(({ remboursement }) => this.remboursementService.create(remboursement)),
      map((remboursement: IRemboursement) =>
        fromRemboursements.createRemboursementSuccess({ remboursement })
      )
    )
  )

  /**
   * Effet pour mettre à jour un remboursement existant
   * Déclenché par l'action updateRemboursement
   */
  updateRemboursement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRemboursements.updateRemboursement),
      switchMap(({ remboursement }) => this.remboursementService.update(remboursement)),
      map((remboursement: IRemboursement) =>
        fromRemboursements.updateRemboursementSuccess({ remboursement })
      )
    )
  )

  /**
   * Effet pour supprimer un remboursement
   * Déclenché par l'action deleteRemboursement
   */
  deleteRemboursement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRemboursements.deleteRemboursement),
      switchMap(({ remboursement }) => this.remboursementService.delete(remboursement)),
      map((remboursement: IRemboursement) =>
        fromRemboursements.deleteRemboursementSuccess({ remboursement })
      )
    )
  )
}

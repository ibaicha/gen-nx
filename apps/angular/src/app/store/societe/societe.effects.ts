import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromSocietes from './index'
import { SocieteService } from '../../services/societe.service'
import { ISociete } from '@shared-models'
 

/**
 * Effets pour la gestion des sociétés
 * Gère les effets secondaires des actions liées aux sociétés
 */
@Injectable()
export class SocieteEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly societeService: SocieteService,
  ) {}

  /**
   * Effet pour récupérer toutes les sociétés
   * Déclenché par l'action getSocietes
   */
  getSocietes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSocietes.getSocietes.type),
      switchMap(() => this.societeService.getSocietes()),
      map((societes: ISociete[]) => fromSocietes.getSocietesSuccess({ societes }))
    )
  )

  /**
   * Effet pour créer une nouvelle société
   * Déclenché par l'action createSociete
   */
  createSociete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSocietes.createSociete),
      switchMap(({ societe }) => this.societeService.create(societe)),
      map((societe: ISociete) => fromSocietes.createSocieteSuccess({ societe }))
    )
  )

  /**
   * Effet pour mettre à jour une société existante
   * Déclenché par l'action updateSociete
   */
  updateSociete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSocietes.updateSociete), 
      switchMap(({ societe }) => this.societeService.update(societe)),
      map((societe: ISociete) => fromSocietes.updateSocieteSuccess({ societe }))
    )
  )

  /**
   * Effet pour supprimer une société
   * Déclenché par l'action deleteSociete
   */
  deleteSociete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSocietes.deleteSociete),
      switchMap(({ societe }) => this.societeService.delete(societe)),
      map((societe: ISociete) => fromSocietes.deleteSocieteSuccess({ societe }))
    )
  )
}

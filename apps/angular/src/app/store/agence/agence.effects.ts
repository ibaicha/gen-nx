import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromAgences from './index'
import { AgenceService } from '../../services/agence.service'
import { IAgence } from '@shared-models'

/**
 * Effets pour la gestion des sociétés
 * Gère les effets secondaires des actions liées aux sociétés
 */
@Injectable()
export class AgenceEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly agenceService: AgenceService,
  ) {}

  /**
   * Effet pour récupérer toutes les sociétés
   * Déclenché par l'action getAgences
   */
  getAgences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAgences.getAgences.type),
      switchMap(() => this.agenceService.getAgences()),
      map((agences: IAgence[]) => fromAgences.getAgencesSuccess({ agences })),
    ),
  )

  /**
   * Effet pour créer une nouvelle société
   * Déclenché par l'action createAgence
   */
  createAgence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAgences.createAgence),
      switchMap(({ agence }) => this.agenceService.create(agence)),
      map((agence: IAgence) => fromAgences.createAgenceSuccess({ agence })),
    ),
  )

  /**
   * Effet pour mettre à jour une société existante
   * Déclenché par l'action updateAgence
   */
  updateAgence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAgences.updateAgence),
      switchMap(({ agence }) => this.agenceService.update(agence)),
      map((agence: IAgence) => fromAgences.updateAgenceSuccess({ agence })),
    ),
  )

  /**
   * Effet pour supprimer une société
   * Déclenché par l'action deleteAgence
   */
  deleteAgence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAgences.deleteAgence),
      switchMap(({ agence }) => this.agenceService.delete(agence)),
      map((agence: IAgence) => fromAgences.deleteAgenceSuccess({ agence })),
    ),
  )
}

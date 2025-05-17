import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromFormeJuridiques from './index'
import { IFormeJuridique } from '@shared-models'
import { FormeJuridiqueService } from '../../services/forme-juridique.service'


/**
 * Effets pour la gestion des formeJuridiques
 * Gère les effets secondaires des actions liées aux formeJuridiques
 */
@Injectable()
export class FormeJuridiqueEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly formeJuridiqueService: FormeJuridiqueService,
  ) {}

  /**
   * Effet pour récupérer toutes les formeJuridiques
   * Déclenché par l'action getFormeJuridiques
   */
  getFormeJuridiques$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromFormeJuridiques.getFormeJuridiques.type),
      switchMap(() => this.formeJuridiqueService.getAll()),
      map((formeJuridiques: IFormeJuridique[]) =>
        fromFormeJuridiques.getFormeJuridiquesSuccess({ formeJuridiques }),
      ),
    ),
  )

  /**
   * Effet pour créer une nouvelle formeJuridique
   * Déclenché par l'action createFormeJuridique
   */
  createFormeJuridique$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromFormeJuridiques.createFormeJuridique),
      switchMap(({ formeJuridique }) => this.formeJuridiqueService.create(formeJuridique)),
      map((formeJuridique: IFormeJuridique) =>
        fromFormeJuridiques.createFormeJuridiqueSuccess({ formeJuridique }),
      ),
    ),
  )

  /**
   * Effet pour mettre à jour une formeJuridique existante
   * Déclenché par l'action updateFormeJuridique
   */
  updateFormeJuridique$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromFormeJuridiques.updateFormeJuridique),
      switchMap(({ formeJuridique }) =>
        this.formeJuridiqueService.update(formeJuridique.id, formeJuridique),
      ),
      map((formeJuridique: IFormeJuridique) =>
        fromFormeJuridiques.updateFormeJuridiqueSuccess({ formeJuridique }),
      ),
    ),
  )

  /**
   * Effet pour supprimer une formeJuridique
   * Déclenché par l'action deleteFormeJuridique
   */
  deleteFormeJuridique$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromFormeJuridiques.deleteFormeJuridique),
      switchMap(({ formeJuridique }) =>
        this.formeJuridiqueService.delete(formeJuridique).pipe(
          map(() => formeJuridique) // Return the deleted formeJuridique
        )
      ),
      map((formeJuridique: IFormeJuridique) =>
        fromFormeJuridiques.deleteFormeJuridiqueSuccess({ formeJuridique }),
      ),
    ),
  )
}

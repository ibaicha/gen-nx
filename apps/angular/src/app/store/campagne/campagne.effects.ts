import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromCampagnes from './index'
import { CampagneService } from '../../services/campagne.service'
import { ICampagne } from '@shared-models'
 

/**
 * Effets pour la gestion des campagnes
 * Gère les effets secondaires des actions liées aux campagnes
 */
@Injectable()
export class CampagneEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly campagneService: CampagneService,
  ) {}

  /**
   * Effet pour récupérer toutes les campagnes
   * Déclenché par l'action getCampagnes
   */
  getCampagnes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCampagnes.getCampagnes.type),
      switchMap(() => this.campagneService.getCampagnes()),
      map((campagnes: ICampagne[]) =>
        fromCampagnes.getCampagnesSuccess({ campagnes }),
      ),
    ),
  )

  /**
   * Effet pour créer une nouvelle campagne
   * Déclenché par l'action createCampagne
   */
  createCampagne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCampagnes.createCampagne),
      switchMap(({ campagne }) => this.campagneService.create(campagne)),
      map((campagne: ICampagne) =>
        fromCampagnes.createCampagneSuccess({ campagne }),
      ),
    ),
  )

  /**
   * Effet pour mettre à jour une campagne existante
   * Déclenché par l'action updateCampagne
   */
  updateCampagne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCampagnes.updateCampagne),
      switchMap(({ campagne }) => this.campagneService.update(campagne)),
      map((campagne: ICampagne) =>
        fromCampagnes.updateCampagneSuccess({ campagne }),
      ),
    ),
  )

  /**
   * Effet pour supprimer une campagne
   * Déclenché par l'action deleteCampagne
   */
  deleteCampagne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCampagnes.deleteCampagne), 
      switchMap(({ campagne }) => this.campagneService.delete(campagne)),
      map((campagne: ICampagne) =>
        fromCampagnes.deleteCampagneSuccess({ campagne }),
      ),
    ),
  )
}

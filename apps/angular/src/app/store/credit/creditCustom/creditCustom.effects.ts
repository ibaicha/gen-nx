import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromCreditCustoms from './index'
import { CreditService } from '../../../services/credit.service'
import { ICreditCustom } from '../../../interfaces/credit.interface'

/**
 * Effets pour la gestion des crédits personnalisés
 * Gère les effets secondaires des actions liées aux crédits personnalisés
 */
@Injectable()
export class CreditCustomEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly creditService: CreditService,
  ) {}

  /**
   * Effet pour récupérer tous les crédits personnalisés
   * Déclenché par l'action getCreditCustoms
   */
  getCreditCustoms$ = createEffect(() =>
    this.actions$.pipe(
      // Filtre les actions de type getCreditCustoms
      ofType(fromCreditCustoms.getCreditCustoms.type),
      // Appelle le service pour récupérer les données
      switchMap(() => this.creditService.getAllCustom()),
      // Transforme la réponse en action success
      map((creditCustoms: ICreditCustom[]) =>
        fromCreditCustoms.getCreditCustomsSuccess({ creditCustoms }),
      ),
    ),
  )
}

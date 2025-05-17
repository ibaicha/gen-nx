// constante.effects.ts
import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as ConstanteActions from './constante.actions'

import { switchMap, map, catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { ConstanteService } from '../../services/constante.service'

@Injectable()
export class ConstanteEffects {
  constructor(
    private actions$: Actions,
    private constanteService: ConstanteService,
  ) {}

  loadConstante$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConstanteActions.loadConstante),
      switchMap(() =>
        this.constanteService.loadAll().pipe(
          map(({ annees, saisons, campagnes, formeJuridiques, localites, varietes, points }) =>
            ConstanteActions.loadConstanteSuccess({ annees, saisons, campagnes, formeJuridiques, localites, varietes, points }),
          ),
          catchError((error) =>
            of(ConstanteActions.loadConstanteFailure({ error })),
          ),
        ),
      ),
    ),
  )
}

import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromCredits from './index'
import { CreditService } from '../../services/credit.service'
import { ICredit, ICreditCustom } from '../../interfaces/credit.interface'

/**
 * Effets pour la gestion des crédits
 * Gère les effets secondaires des actions liées aux crédits
 */
@Injectable()
export class CreditEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly creditService: CreditService,
  ) {}

  /**
   * Effet pour récupérer tous les crédits
   * Déclenché par l'action getCredits
   */
  getCredits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCredits.getCredits.type),
      switchMap(() => this.creditService.getCredits()),
      map((credits: ICredit[]) => fromCredits.getCreditsSuccess({ credits })),
    ),
  )

  /**
   * Effet pour récupérer tous les crédits personnalisés
   * Déclenché par l'action getCreditsCustom
   */
  getCreditsCustom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCredits.getCreditsCustom.type),
      switchMap(() => this.creditService.getAllCustom()),
      map((creditsCustom: ICreditCustom[]) =>
        fromCredits.getCreditsCustomSuccess({ creditsCustom }),
      ),
    ),
  )

  /**
   * Effet pour récupérer les crédits personnalisés par agence, variété, année et saison
   * Déclenché par l'action getAllCustomCreditAgenceVarieteAnneeSaison
   */
  getAllCustomCreditAgenceVarieteAnneeSaison$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCredits.getAllCustomCreditAgenceVarieteAnneeSaison.type),
      switchMap(({ agenceSocieteId, produitId, anneeId, saisonId }) =>
        this.creditService.getAllCustomCreditAgenceVarieteAnneeSaison(
          agenceSocieteId,
          produitId,
          anneeId,
          saisonId,
        ),
      ),
      map((customCreditAgenceVarieteAnneeSaison: ICreditCustom[]) =>
        fromCredits.getAllCustomCreditAgenceVarieteAnneeSaisonSuccess({
          customCreditAgenceVarieteAnneeSaison,
        }),
      ),
    ),
  )

  /**
   * Effet pour récupérer les crédits personnalisés par société, variété, année et saison
   * Déclenché par l'action getAllCustomCreditSocieteVarieteAnneeSaison
   */
  getAllCustomCreditSocieteVarieteAnneeSaison$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCredits.getAllCustomCreditSocieteVarieteAnneeSaison.type),
      switchMap(({ etablissementId, produitId, anneeId, saisonId }) =>
        this.creditService.getAllCustomCreditSocieteVarieteAnneeSaison(
          etablissementId,
          produitId,
          anneeId,
          saisonId,
        ),
      ),
      map((customCreditSocieteVarieteAnneeSaison: ICreditCustom[]) =>
        fromCredits.getAllCustomCreditSocieteVarieteAnneeSaisonSuccess({
          customCreditSocieteVarieteAnneeSaison,
        }),
      ),
    ),
  )

  /**
   * Effet pour récupérer les crédits avec filtres
   * Déclenché par l'action getAllCreditWithFilters
   */
  getAllCreditWithFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCredits.getAllCreditWithFilters.type),
      switchMap(({ filter }) =>
        this.creditService
          .getAllCreditsWithFilters(filter)
          .pipe(
            map((creditWithFilters: ICreditCustom[]) =>
              fromCredits.getAllCreditWithFiltersSuccess({ creditWithFilters }),
            ),
          ),
      ),
    ),
  )

  /**
   * Effet pour créer un nouveau crédit
   * Déclenché par l'action createCredit
   */
  createCredit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCredits.createCredit),
      switchMap(({ body }) => this.creditService.create(body)),
      map((credit) => fromCredits.createCreditSuccess({ credit })),
    ),
  )

  /**
   * Effet pour mettre à jour un crédit existant
   * Déclenché par l'action updateCredit
   */
  updateCredit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCredits.updateCredit),
      switchMap(({ body }) => this.creditService.update(body)),
      map((credit) => fromCredits.updateCreditSuccess({ credit })),
    ),
  )

  /**
   * Effet pour créer un crédit d'exploitation
   * Déclenché par l'action createExploitationCredit
   */
  createExploitationCredit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCredits.createExploitationCredit),
      switchMap(({ body }) =>
        this.creditService.createExploitationCredit(body),
      ),
      map((exploitationCredit) =>
        fromCredits.createExploitationCreditSuccess({ exploitationCredit }),
      ),
    ),
  )

  /**
   * Effet pour supprimer un crédit
   * Déclenché par l'action deleteCredit
   */
  deleteCredit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCredits.deleteCredit),
      switchMap(({ body }) => this.creditService.delete(body)),
      map((credit) => fromCredits.deleteCreditSuccess({ credit })),
    ),
  )
}

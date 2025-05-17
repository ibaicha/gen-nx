import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import * as fromClients from './index'
import { ClientService } from '../../services/client.service'
import { IClient } from '../../interfaces/client.interface'

/**
 * Effets pour la gestion des clients
 * Gère les effets secondaires des actions liées aux clients
 */
@Injectable()
export class ClientEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly clientService: ClientService,
  ) {}

  /**
   * Effet pour récupérer tous les clients
   * Déclenché par l'action getClients
   */
  getClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromClients.getClients.type),
      switchMap(() => this.clientService.getClients()),
      map((clients: IClient[]) => fromClients.getClientsSuccess({ clients })),
    ),
  )

  /**
   * Effet pour créer un nouveau client
   * Déclenché par l'action createClient
   */
  createClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromClients.createClient),
      switchMap(({ client }) => this.clientService.create(client)),
      map((client: IClient) => fromClients.createClientSuccess({ client })),
    ),
  )

  /**
   * Effet pour mettre à jour un client existant
   * Déclenché par l'action updateClient
   */
  updateClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromClients.updateClient),
      switchMap(({ client }) => this.clientService.update(client)),
      map((client: IClient) => fromClients.updateClientSuccess({ client })),
    ),
  )

  /**
   * Effet pour supprimer un client
   * Déclenché par l'action deleteClient
   */
  deleteClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromClients.deleteClient),
      switchMap(({ client }) => this.clientService.delete(client)),
      map((client: IClient) => fromClients.deleteClientSuccess({ client })),
    ),
  )
}

import { Action, createReducer, on } from '@ngrx/store'
import { IClientState } from './client.model'
import * as fromClients from './index'

/**
 * État initial du reducer des clients
 */
export const initialClientState: IClientState = {
  clients: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des clients
 */
const reducer = createReducer<IClientState>(
  initialClientState,

  /**
   * Gestion des actions de récupération
   */
  on(fromClients.getClient, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromClients.getClientSuccess, (state, { oneClient }) => ({
    ...state,
    isLoading: false,
    oneClient,
  })),

  on(fromClients.getClients, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromClients.getClientsSuccess, (state, { clients }) => ({
    ...state,
    isLoading: false,
    clients,
  })),

  /**
   * Gestion des actions de création
   */
  on(fromClients.createClient, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromClients.createClientSuccess, (state, { client }) => ({
    ...state,
    clients: [...state.clients, client],
    isLoading: false,
  })),

  /**
   * Gestion des actions de mise à jour
   */
  on(fromClients.updateClient, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromClients.updateClientSuccess, (state, { client }) => ({
    ...state,
    clients: state.clients.map((item) =>
      item.id === client.id ? client : item,
    ),
    isLoading: false,
  })),

  /**
   * Gestion des actions de suppression
   */
  on(fromClients.deleteClient, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromClients.deleteClientSuccess, (state, { client }) => ({
    ...state,
    clients: state.clients.filter((item) => item.id !== client.id),
    isLoading: false,
  })),
)

/**
 * Fonction reducer exportée pour la gestion de l'état des clients
 */
export function clientReducer(
  state = initialClientState,
  actions: Action,
): IClientState {
  return reducer(state, actions)
}

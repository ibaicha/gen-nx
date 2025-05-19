import { createAction, props } from '@ngrx/store'
import { IOp } from '@shared-models'

/**
 * Préfixe pour toutes les actions liées aux clients
 */
const prefix = '[Clients]'

/**
 * Actions pour la récupération d'un client spécifique
 */
export const getClient = createAction(
  `${prefix} Get Single Client`,
  props<{ id: number }>(),
)

export const getClientSuccess = createAction(
  `${getClient.type} Success`,
  props<{ oneClient: IOp }>(),
)

/**
 * Actions pour la récupération de tous les clients
 */
export const getClients = createAction(`${prefix} Get All Clients`)

export const getClientsSuccess = createAction(
  `${getClients.type} Success`,
  props<{ clients: IOp[] }>(),
)

/**
 * Actions pour la création d'un nouveau client
 */
export const createClient = createAction(
  `${prefix} Create Client`,
  props<{ client: IOp }>(),
)

export const createClientSuccess = createAction(
  `${createClient.type} Success`,
  props<{ client: IOp }>(),
)

/**
 * Actions pour la mise à jour d'un client existant
 */
export const updateClient = createAction(
  `${prefix} Update Client`,
  props<{ client: IOp }>(),
)

export const updateClientSuccess = createAction(
  `${updateClient.type} Success`,
  props<{ client: IOp }>(),
)

/**
 * Actions pour la suppression d'un client
 */
export const deleteClient = createAction(
  `${prefix} Delete Client`,
  props<{ client: IOp }>(),
)

export const deleteClientSuccess = createAction(
  `${deleteClient.type} Success`,
  props<{ client: IOp }>(),
)

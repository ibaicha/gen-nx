import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IClientState } from './client.model'

/**
 * Sélecteur de base pour l'état des clients
 */
export const selectClientState = createFeatureSelector<IClientState>('client')

/**
 * Sélecteur pour obtenir la liste des clients
 */
export const selectClientsList = createSelector(
  selectClientState,
  (state) => state.clients,
)

/**
 * Sélecteur pour obtenir l'état de chargement
 */
export const selectClientIsLoading = createSelector(
  selectClientState,
  (state) => state.isLoading,
)

/**
 * Sélecteur pour obtenir un client par son ID
 * @param itemId - ID du client à rechercher
 */
export const selectClientById = (itemId: number) =>
  createSelector(selectClientState, (state) =>
    state.clients.find((item) => item.id === itemId),
  )

import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IFiliereState } from './filiere.model'

/**
 * Sélecteur de base pour l'état des filières
 */
export const selectFiliereState = createFeatureSelector<IFiliereState>('filiere')

/**
 * Sélecteur pour obtenir la liste complète des filières
 */
export const selectFilieresList = createSelector(
  selectFiliereState,
  (state) => state.filieres
)

/**
 * Sélecteur pour obtenir l'état de chargement
 */
export const selectFiliereIsLoading = createSelector(
  selectFiliereState,
  (state) => state.isLoading
)

/**
 * Sélecteur pour obtenir une filière par son ID
 * @param itemId - ID de la filière à rechercher
 */
export const selectFiliereById = (itemId: number) => createSelector(
  selectFiliereState,
  (state) => state.filieres.find((item) => item.id === itemId)
)

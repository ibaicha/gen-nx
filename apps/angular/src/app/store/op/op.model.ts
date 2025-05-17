import { CreateOpPortefeuilleDto, IOp } from '@shared-models'

/**
 * Interface définissant l'état du store pour les opérations (OPs)
 */
export interface IOpState {
  /** Liste complète des opérations */
  ops: IOp[]

  /** Liste des opérations portefeuilles */
  opsPortefeuilles: CreateOpPortefeuilleDto[]

  /** Liste des opérations personnalisées par agence */
  opsCustomFromAgences: IOp[]

  /** Liste des opérations filtrées */

  /** Ops filtrés selon critères spécifiques */
  opsWithFilters: IOp[]

  /** Indicateur de chargement */
  isLoading: boolean

  /** Erreur */
  error: any
}

export class GetOpParamsDTO {
  opId?: number[]
  societeId?: number[]
  societeAgenceId?: number[]
  agenceId?: number[]
  pointId?: number[]
  formeJuridiqueId?: number[]
  localiteId?: number[]
  page?: number // Ajout du champ page
  limit?: number // Ajout du champ limit
}

import { IAnnee, ICampagne, IFormeJuridique, ILocalite, IPoint, ISaison, IVariete } from '@shared-models'

/**
 * Interface définissant l'état du store pour les clients
 */
export interface IConstanteState {
  /** Liste des annees */
  annees: IAnnee[]
  /** Liste des saisons */
  saisons: ISaison[]
  /** Liste des campagnes */
  campagnes: ICampagne[]
  /** Liste des formes juridiques */
  formeJuridiques: IFormeJuridique[]
  /** Liste des localites */
  localites: ILocalite[]
  /** Liste des varietes */
  varietes: IVariete[]
  /** Liste des points */
  points: IPoint[]

  /** Indicateur de chargement */
  isLoading: boolean

  /** Erreur */
  error: any
}

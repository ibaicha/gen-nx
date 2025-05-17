import {
  ICredit,
  ICreditCustom, 
  IExploitationCredit
} from '../../interfaces/credit.interface'

/**
 * Interface définissant l'état du store pour les crédits
 */
export interface ICreditState {
  /** Liste des crédits standards */
  credits: ICredit[]

  /** Liste des crédits personnalisés */
  creditsCustom: ICreditCustom[]

  /** Crédits personnalisés filtrés par agence, variété, année et saison */
  customCreditAgenceVarieteAnneeSaison: ICreditCustom[]

  /** Crédits personnalisés filtrés par société, variété, année et saison */
  customCreditSocieteVarieteAnneeSaison: ICreditCustom[]

  /** Liste des crédits liés aux exploitations */
  exploitationCredits: IExploitationCredit[]

  /** Crédits filtrés selon critères spécifiques */
  creditWithFilters: ICreditCustom[]

  /** Indicateur de chargement */
  isLoading: boolean
}



export class GetCreditParamsDTO {
  societeId?: number[]
  agenceId?: number[]
  anneeId?: number[]
  saisonId?: number[]
  opId?: number[]
}

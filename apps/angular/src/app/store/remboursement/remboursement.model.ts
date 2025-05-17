/**
 * Import de l'interface IRemboursement depuis le fichier credit.interface
 */
import { IRemboursement } from '../../interfaces/credit.interface'

/**
 * Interface définissant l'état des remboursements dans le store
 * @interface IRemboursementState
 * @property {IRemboursement[]} remboursements - Tableau contenant les remboursements
 * @property {boolean} isLoading - Indicateur de chargement
 */
export interface IRemboursementState {
  remboursements: IRemboursement[]
  isLoading: boolean
}

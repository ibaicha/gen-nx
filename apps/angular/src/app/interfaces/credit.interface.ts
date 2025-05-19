import {
  IAnnee,
  IEmplacement,
  IExploitation,
  IOp,
  IProduit,
  ISaison,
  IUniteTransformation,
  IVariete,
} from '@shared-models'

/**
 * Interface de base pour un crédit
 */
export interface ICredit {
  id: number
  dateCredit: Date
  capital: number
  interet: number
  moratoire: number
  autres_engagements: number
  exploitationId: number
  exploitation: IExploitation
}

/**
 * Interface pour les sommes de crédits
 */
export interface ISumCredit {
  sumCapitals: string
  sumMoratoires: string
  sumInterets: string
  sumAutresEngagements: string
  sumExigibles: string
  sumRemboursements: string
}

/**
 * Interface pour un remboursement
 */
export interface IRemboursement {
  id: number
  date: Date
  pu: number
  quantite: number
  valeur: number
  typeRemboursementId: number
  typeRemboursement: ITypeRemboursement
  exploitationId: number
  exploitation: IExploitation
  emballageId: number
  emballage: IEmballage
}

/**
 * Interface pour un mouvement de stock
 */
export interface IMouvementStockage {
  id: number
  date: Date
  pu: number
  quantiteEntreeEmballage: number
  quantiteSortieEmballage: number
  nombreUnite: number
  valeur: number
  opId: number
  op: IOp
  uniteTransformationId: number
  uniteTransformation: IUniteTransformation
  varieteId: number
  variete: IVariete
  modeEntreeSortieStockId: number
  modeEntreeSortieStock: IModeEntreeSortieStock
  anneeId: number
  annee: IAnnee
  saisonId: number
  saison: ISaison
  emplacementId: number
  emplacement: IEmplacement
  emballageId: number
  emballage: IEmballage
}

/**
 * Interface pour le type de mouvement de stock
 */
export interface ITypeMouvementStockage {
  id: number
  name: string
}

/**
 * Interface pour le mode d'entrée/sortie de stock
 */
export interface IModeEntreeSortieStock {
  id: number
  name: string
  typeMouvementStockageId: number
  typeMouvementStockage: ITypeMouvementStockage
}

/**
 * Interface pour une récolte
 */
export interface IRecolte {
  id: number
  date: Date
  pu: number
  quantite: number
  valeur: number
  exploitationId: number
  varieteId: number
  emballageId: number
}

/**
 * Interface pour le type de remboursement
 */
export interface ITypeRemboursement {
  id: number
  name: string
}

/**
 * Interface pour le type d'emballage
 */
export interface ITypeEmballage {
  id: number
  name: string
  conditionnement: string
  quantite: number
  pu: number
  valeur: number
  isActive: boolean
  isDefault: boolean
  produitId: number
  produit: IProduit
  typeEmballageId: number
  typeEmballage: ITypeEmballage
}

/**
 * Interface pour l'emballage
 */
export interface IEmballage {
  id: number
  name: string
}

/**
 * Interface pour le type d'unité de grandeur
 */
export interface ITypeUniteGrandeur {
  id: number
  name: string
}

/**
 * Interface pour l'unité de grandeur
 */
export interface IUniteGrandeur {
  id: number
  name: string
  typeUniteGrandeurId: number
  typeUniteGrandeur: ITypeUniteGrandeur
}

/**
 * Interface pour la sur-unité de grandeur
 */
export interface ISurUniteGrandeur {
  id: number
  name: string
  valeurReference: number
  uniteGrandeur: IUniteGrandeur
}

/**
 * Interface personnalisée pour l'exploitation de crédit
 */
export interface IExploitationCreditCustom {
  id: number
  dateCredit: string
  capital: number
  interet: number
  moratoire: number
  autres_engagements: number
  exigible: number
  capitalFormat: string
  interetFormat: string
  moratoireFormat: string
  autres_engagementsFormat: string
  exigibleFormat: string
  agenceId: number
  agenceName: string
  agenceSigle: string
  societeId: number
  societeName: string
  societeSigle: string
  exploitationId: number
  exploitationOpId: number
  exploitationOpName: string
  exploitationOpPointId: number
  exploitationOpPointName: string
  exploitationOpPointAgenceId: number
  exploitationOpPointAgenceName: string
  exploitationOpPointAgenceSigle: string
  exploitationOpPointAgenceSocieteId: number
  exploitationOpPointAgenceSocieteName: string
  exploitationOpPointAgenceSocieteSigle: string
  exploitationTypeOpId: number
  exploitationTypeOpName: string
  exploitationAnneeId: number
  exploitationAnneeName: string
  exploitationSaisonId: number
  exploitationSaisonName: string
  exploitationVarieteId: number
  exploitationVarieteName: string
  exploitationProduitId: number
  exploitationProduitName: string
  exploitationFiliereId: number
  exploitationFiliereName: string
  exploitationFamilleEmplacemenId: number
  exploitationFamilleEmplacementName: string
  exploitationCompte: number
  exploitationDate: string
  exploitationUnite: string
  exploitationSurface: number
  remboursementsSum: number
  remboursementsSumFormat: string
  remboursementsCount: number
  tauxRemboursement: number
  tauxRemboursementFormat: string
  remboursementsMouvementSum: number
  remboursementsMouvementCount: number
  remboursementsMouvementSumFormat: string
  tauxRemboursementMouvement: number
  tauxRemboursementMouvementFormat: string
}

/**
 * Interface pour l'exploitation de crédit
 */
export interface IExploitationCredit {
  id: number
  date: Date
  capital: number
  interet: number
  moratoire: number
  autres_engagements: number
  agenceId: number
  compte: ''
  exploitationId: number
  dateExploitation: Date
  unite: ''
  surface: number
  varieteId: number
  anneeId: number
  saisonId: number
  producteurId: number
  opId: number
}

/**
 * Interface personnalisée pour le crédit
 */
export interface ICreditCustom {
  id: number
  dateCredit: string
  capital: number
  interet: number
  moratoire: number
  autres_engagements: number
  agenceId: number
  agenceName: string
  agenceSigle: string
  exploitationId: number
  exploitationOpId: number
  exploitationOpName: string
  exploitationTypeOpId: number
  exploitationTypeOpName: string
  exploitationAnneeId: number
  exploitationAnneeName: string
  exploitationSaisonId: number
  exploitationSaisonName: string
  exploitationVarieteId: number
  exploitationVarieteName: string
  exploitationVarieteSurfaceUnite: string
  exploitationVarieteQuantiteUnite: string
  exploitationVarieteRendementUnite: number
  exploitationProduitId: number
  exploitationProduitName: string
  exploitationFiliereId: number
  exploitationFiliereName: string
  exploitationFamilleEmplacemenId: number
  exploitationFamilleEmplacementName: string
  exploitationCompte: string
  exploitationDate: Date
  exploitationUnite: string
  exploitationSurface: number
  exigible: number
  capitalFormat: string
  interetFormat: string
  moratoireFormat: string
  autres_engagementsFormat: string
  exigibleFormat: string
  societeId: number
  societeName: string
  societeSigle: string
  exploitationOpPointId: number
  exploitationOpPointName: string
  exploitationOpPointAgenceId: number
  exploitationOpPointAgenceName: string
  exploitationOpPointAgenceSigle: string
  exploitationOpPointAgenceSocieteId: number
  exploitationOpPointAgenceSocieteName: string
  exploitationOpPointAgenceSocieteSigle: string
  remboursementsSum: number
  remboursementsSumFormat: string
  remboursementsCount: number
  tauxRemboursement: number
  tauxRemboursementFormat: string
  remboursementsMouvementSum: number
  remboursementsMouvementCount: number
  remboursementsMouvementSumFormat: string
  tauxRemboursementMouvement: number
  tauxRemboursementMouvementFormat: string
}

/**
 * Interface personnalisée pour le remboursement
 */
export interface IRemboursementCustom {
  id: number
  date: Date
  pu: number
  quantite: number
  valeur: number
  emballageId: number
  emballageName: string
  typeEmballageId: number
  typeEmballageName: string
  pointId: number
  pointName: string
  localiteId: number
  localiteName: string
}

/**
 * Interface personnalisée pour le mouvement
 */
export interface IMouvementCustom {
  id: number
  date: Date
  pu: number
  quantite: number
  valeur: number
  emballageId: number
  emballageName: string
  emplacementId: number
  emplacementName: string
}

/**
 * Interface personnalisée pour la récolte
 */
export interface IRecolteCustom {
  id: number
  date: Date
  pu: number
  quantite: number
  valeur: number
  emballageId: number
  emballageName: string
  typeEmballageId: number
  typeEmballageName: string
}

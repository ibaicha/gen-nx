import { IAnnee, IEmplacement, IOp, ISaison } from '@shared-models'

import { IChargeExploitation } from './exploitation.interface'

/**
 * Interface représentant un mouvement d'intrant
 */
export interface IMouvementIntrant {
  /** Identifiant unique */
  id: number
  /** Date du mouvement */
  date: string
  /** Prix unitaire */
  pu: number
  /** Quantités */
  quantiteEntreeEmballage: number
  quantiteSortieEmballage: number
  quantiteEntreeSortieEmballage: number
  nombreUnite: number
  /** Valeur totale */
  valeur: number
  /** Numéro de lot */
  lot: string

  /** Informations sur la charge d'exploitation */
  chargeExploitationId: number
  chargeExploitationName: string
  chargeExploitation: IChargeExploitation

  /** Informations sur le mode d'entrée/sortie */
  modeEntreeSortieIntrantId: number
  modeEntreeSortieIntrantName: string
  modeEntreeSortieIntrant: IModeEntreeSortieIntrant

  /** Informations sur l'année */
  anneeId: number
  anneeName: string
  anneeValeur: number
  annee: IAnnee

  /** Informations sur la saison */
  saisonId: number
  saisonName: string
  saisonDescription: string
  saison: ISaison

  /** Informations sur l'emballage */
  emballageIntrantId: number
  emballageIntrantName: string

  /** Informations sur l'OP */
  opId: number
  opName: string
  opSigle: string
  op: IOp

  /** Informations sur le fournisseur */
  fournisseurId: number
  fournisseurName: string
  fournisseurSigle: string
  fournisseur: IFournisseur

  /** Informations sur le partenaire */
  partenaireId: number
  partenaireName: string
  partenaireSigle: string

  /** Informations sur l'emplacement */
  emplacementId: number
  emplacementName: string
  entrepotId: number
  entrepotName: string
  pointId: number
  pointName: string
  emplacement: IEmplacement

  /** Informations sur l'emplacement source */
  emplacementSourceId: number
  emplacementSourceName: string
  entrepotSourceId: number
  entrepotSourceName: string
  pointSourceId: number
  pointSourceName: string
  emplacementSource: IEmplacement

  /** Informations sur l'emplacement destination */
  emplacementDestinationId: number
  emplacementDestinationName: string
  entrepotDestinationId: number
  entrepotDestinationName: string
  pointDestinationId: number
  pointDestinationName: string
  emplacementDestination: IEmplacement
}

/**
 * Interface représentant un mode d'entrée/sortie d'intrant
 */
export interface IModeEntreeSortieIntrant {
  /** Identifiant unique */
  id: number
  /** Nom du mode */
  name: string
  /** Type de mouvement */
  typeMouvementIntrantId: number
  typeMouvementIntrant: ITypeMouvementIntrant
}

/**
 * Interface représentant un type de mouvement d'intrant
 */
export interface ITypeMouvementIntrant {
  /** Identifiant unique */
  id: number
  /** Nom du type */
  name: string
}

/**
 * Interface représentant un fournisseur
 */
export interface IFournisseur {
  /** Identifiant unique */
  id: number
  /** Nom du fournisseur */
  name: string
  /** Sigle/acronyme */
  sigle: string
  /** Coordonnées */
  email: string
  telephone: string
  adresse: string
  /** Informations sur le contact */
  prenom_contact: string
  nom_contact: string
  email_contact: string
  telephone_contact: string
  /** Structure associée */
  structure: IStructure
}

/**
 * Interface représentant une structure
 */
export interface IStructure {
  /** Identifiant unique */
  id: number
  /** Nom de la structure */
  name: string
  /** Sigle/acronyme */
  sigle: string
  /** Coordonnées */
  email: string
  telephone: string
  adresse: string
}

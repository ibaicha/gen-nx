/**
 * Interface représentant un identifiant avec ses différents formats
 */
export interface IIdentifiant {
  /** Identifiant unique */
  id: number

  /** Genre/Sexe (0: Femme, 1: Homme) */
  sexe: number

  /** Informations sur l'année */
  annee_string: string // Format texte de l'année
  annee_numeric: number // Format numérique de l'année
  annee_true: number // Année réelle/effective

  /** Informations sur l'ordre */
  ordre_string: string // Format texte de l'ordre
  ordre_numeric: number // Format numérique de l'ordre

  /** Informations sur le code */
  code_string: string // Format texte du code
  code_numeric: number // Format numérique du code
}

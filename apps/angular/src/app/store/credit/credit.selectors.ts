import { createFeatureSelector, createSelector } from '@ngrx/store'
import { GetCreditParamsDTO, ICreditState } from './credit.model'
 
import { ICreditCustom } from '../../interfaces/credit.interface'
import { IOp } from '@shared-models'

/**
 * Sélecteur de base pour l'état des crédits
 */
export const selectCreditState = createFeatureSelector<ICreditState>('credit')

/**
 * Sélecteurs de base
 */
export const selectCreditsList = createSelector(
  selectCreditState,
  (state) => state.credits,
)

export const selectCreditIsLoading = createSelector(
  selectCreditState,
  (state) => state.isLoading,
)

export const selectCreditById = (itemId: number) =>
  createSelector(selectCreditState, (state) =>
    state.credits.find((item) => item.id === itemId),
  )

/**
 * Sélecteurs pour les crédits personnalisés
 */
export const selecCustomCreditAgenceVarieteAnneeSaisonList = createSelector(
  selectCreditState,
  (state) => state.customCreditAgenceVarieteAnneeSaison,
)

export const selecCustomCreditSocieteVarieteAnneeSaisonList = createSelector(
  selectCreditState,
  (state) => state.customCreditSocieteVarieteAnneeSaison,
)

// Sélecteur pour récupérer la liste des crédits
export const selectCreditWithFiltersList = createSelector(
  selectCreditState,
  (state) => state.creditWithFilters,
)

// Sélecteur pour appliquer des filtres dynamiques
export const selectFilteredCreditWithParamsBon = createSelector(
  selectCreditWithFiltersList,
  (credits: ICreditCustom[], props: GetCreditParamsDTO) => {
    if (!props || Object.keys(props).length === 0) {
      return credits // Aucun paramètre, retournez la liste complète
    }

    return credits.filter((credit) =>
      Object.keys(props).every((key) => {
        if (props[key as keyof GetCreditParamsDTO] === undefined) {
          return true // Ignorez les paramètres non définis
        }
        return (
          credit[key as keyof ICreditCustom]?.toString() ===
          props[key as keyof GetCreditParamsDTO]?.toString()
        )
      }),
    )
  },
)

export const selectFilteredCreditWithParams = createSelector(
  selectCreditWithFiltersList,
  (credits: ICreditCustom[], props: GetCreditParamsDTO) => {
    if (!props || Object.keys(props).length === 0) {
      return credits // Aucun paramètre, retournez la liste complète
    }

    return credits.filter((credit) =>
      Object.keys(props).every((key) => {
        if (props[key as keyof GetCreditParamsDTO] === undefined) {
          return true // Ignorez les paramètres non définis
        }
        return (
          credit[key as keyof ICreditCustom]?.toString() ===
          props[key as keyof GetCreditParamsDTO]?.toString()
        )
      }),
    )
  },
)
/**
 * Sélecteurs filtrés par client
 */
export const selectCreditsCustomListFromClient = (client: IOp) =>
  createSelector(
    selectCreditState,
    (state) =>
      state?.creditsCustom?.filter(
        (credit) => credit.exploitationOpId === client.id,
      ) || [],
  )

/**
 * Sélecteurs filtrés par agence
 */
export const selectCreditsCustomListFromAgence = (
  idAgence: number,
  idAnnee: number,
  idSaison: number,
) =>
  createSelector(
    selectCreditState,
    (state) =>
      state?.creditsCustom?.filter(
        (credit) =>
          credit.agenceId === idAgence &&
          credit.exploitationAnneeId === idAnnee &&
          credit.exploitationSaisonId === idSaison,
      ) || [],
  )

export const selectCreditsCustomListFromAgenceAnneeSaison =
  selectCreditsCustomListFromAgence // Alias pour compatibilité

/**
 * Sélecteurs filtrés par point
 */
export const selectCreditsCustomListFromPoint = (idPoint: number) =>
  createSelector(
    selectCreditState,
    (state) =>
      state?.creditsCustom?.filter(
        (credit) => credit.exploitationOpPointId === idPoint,
      ) || [],
  )

export const selectCreditsCustomListFromPointAnneeSaison = (
  idPoint: number,
  idAnnee: number,
  idSaison: number,
) =>
  createSelector(
    selectCreditState,
    (state) =>
      state?.creditsCustom?.filter(
        (credit) =>
          credit.exploitationOpPointId === idPoint &&
          credit.exploitationAnneeId === idAnnee &&
          credit.exploitationSaisonId === idSaison,
      ) || [],
  )

/**
 * Fonctions utilitaires pour les calculs
 */
const calculateSum = (credits: any[], field: keyof (typeof credits)[0]) =>
  credits.reduce((sum, credit) => sum + credit[field], 0)

const calculateTotalExigible = (credits: any[]) => {
  const fields = ['capital', 'moratoire', 'interet', 'autres_engagements']
  return fields.reduce(
    (total, field) => total + calculateSum(credits, field),
    0,
  )
}

/**
 * Sélecteurs de sommes pour un point donné
 */
export const sumCapitalsFromPoint = (
  idPoint: number,
  idAnnee: number,
  idSaison: number,
) =>
  createSelector(
    selectCreditsCustomListFromPointAnneeSaison(idPoint, idAnnee, idSaison),
    (credits) => calculateSum(credits, 'capital'),
  )

export const sumMoratoiresFromPoint = (
  idPoint: number,
  idAnnee: number,
  idSaison: number,
) =>
  createSelector(
    selectCreditsCustomListFromPointAnneeSaison(idPoint, idAnnee, idSaison),
    (credits) => calculateSum(credits, 'moratoire'),
  )

export const sumInteretsFromPoint = (
  idPoint: number,
  idAnnee: number,
  idSaison: number,
) =>
  createSelector(
    selectCreditsCustomListFromPointAnneeSaison(idPoint, idAnnee, idSaison),
    (credits) => calculateSum(credits, 'interet'),
  )

export const sumAutresEngagementsFromPoint = (
  idPoint: number,
  idAnnee: number,
  idSaison: number,
) =>
  createSelector(
    selectCreditsCustomListFromPointAnneeSaison(idPoint, idAnnee, idSaison),
    (credits) => calculateSum(credits, 'autres_engagements'),
  )

export const sumExigibleFromPoint = (
  idPoint: number,
  idAnnee: number,
  idSaison: number,
) =>
  createSelector(
    selectCreditsCustomListFromPointAnneeSaison(idPoint, idAnnee, idSaison),
    calculateTotalExigible,
  )

/**
 * Sélecteurs de sommes pour une agence donnée
 */
export const sumCapitalsFromAgence = (
  idAgence: number,
  idAnnee: number,
  idSaison: number,
) =>
  createSelector(
    selectCreditsCustomListFromAgence(idAgence, idAnnee, idSaison),
    (credits) => calculateSum(credits, 'capital'),
  )

export const sumMoratoiresFromAgence = (
  idAgence: number,
  idAnnee: number,
  idSaison: number,
) =>
  createSelector(
    selectCreditsCustomListFromAgence(idAgence, idAnnee, idSaison),
    (credits) => calculateSum(credits, 'moratoire'),
  )

export const sumInteretsFromAgence = (
  idAgence: number,
  idAnnee: number,
  idSaison: number,
) =>
  createSelector(
    selectCreditsCustomListFromAgence(idAgence, idAnnee, idSaison),
    (credits) => calculateSum(credits, 'interet'),
  )

export const sumAutresEngagementsFromAgence = (
  idAgence: number,
  idAnnee: number,
  idSaison: number,
) =>
  createSelector(
    selectCreditsCustomListFromAgence(idAgence, idAnnee, idSaison),
    (credits) => calculateSum(credits, 'autres_engagements'),
  )

export const sumExigibleFromAgence = (
  idAgence: number,
  idAnnee: number,
  idSaison: number,
) =>
  createSelector(
    selectCreditsCustomListFromAgence(idAgence, idAnnee, idSaison),
    calculateTotalExigible,
  )

import { Action, createReducer, on } from '@ngrx/store'
import { ICreditState } from './credit.model'
import * as fromCredits from './index'

/**
 * État initial du reducer des crédits
 */
export const initialCreditState: ICreditState = {
  credits: [],
  creditsCustom: [],
  customCreditAgenceVarieteAnneeSaison: [],
  customCreditSocieteVarieteAnneeSaison: [], 
  exploitationCredits: [],
  creditWithFilters: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des crédits
 */
const reducer = createReducer<ICreditState>(
  initialCreditState,

  /**
   * Gestion des actions de récupération des crédits standards
   */
  on(fromCredits.getCredit, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromCredits.getCreditSuccess, (state, { oneCredit }) => ({
    ...state,
    isLoading: false,
    oneCredit,
  })),

  on(fromCredits.getCredits, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromCredits.getCreditsSuccess, (state, { credits }) => ({
    ...state,
    isLoading: false,
    credits,
  })),

  /**
   * Gestion des actions pour les crédits personnalisés
   */
  on(fromCredits.getCreditsCustom, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromCredits.getCreditsCustomSuccess, (state, { creditsCustom }) => ({
    ...state,
    isLoading: false,
    creditsCustom,
  })),

  /**
   * Gestion des crédits d'exploitation
   */
  on(fromCredits.createExploitationCredit, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromCredits.createExploitationCreditSuccess, (state, { exploitationCredit }) => ({
    ...state,
    exploitationCredits: [...state.exploitationCredits, exploitationCredit],
    isLoading: false,
  })),

  /**
   * Gestion des crédits personnalisés filtrés
   */
  on(fromCredits.getAllCustomCreditAgenceVarieteAnneeSaison, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromCredits.getAllCustomCreditAgenceVarieteAnneeSaisonSuccess, 
    (state, { customCreditAgenceVarieteAnneeSaison }) => ({
      ...state,
      isLoading: false,
      customCreditAgenceVarieteAnneeSaison,
  })),

  on(fromCredits.getAllCustomCreditSocieteVarieteAnneeSaison, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromCredits.getAllCustomCreditSocieteVarieteAnneeSaisonSuccess,
    (state, { customCreditSocieteVarieteAnneeSaison }) => ({
      ...state,
      isLoading: false,
      customCreditSocieteVarieteAnneeSaison,
  })),

  /**
   * Gestion des actions CRUD standards
   */
  on(fromCredits.createCredit, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromCredits.createCreditSuccess, (state, { credit }) => ({
    ...state,
    credits: [...state.credits, credit],
    isLoading: false,
  })),

  on(fromCredits.getAllCreditWithFilters, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromCredits.getAllCreditWithFiltersSuccess, (state, { creditWithFilters }) => ({
    ...state,
    isLoading: false,
    creditWithFilters,
  })),

  on(fromCredits.updateCredit, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromCredits.updateCreditSuccess, (state, { credit }) => ({
    ...state,
    credits: state.credits.map((b) => (b.id === credit.id ? credit : b)),
    isLoading: false,
  })),

  on(fromCredits.deleteCredit, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromCredits.deleteCreditSuccess, (state, { credit }) => ({
    ...state,
    isLoading: false,
    credits: state.credits.filter((b) => b.id !== credit.id),
  })),
)

/**
 * Fonction reducer exportée pour la gestion de l'état des crédits
 */
export function creditReducer(
  state = initialCreditState,
  actions: Action,
): ICreditState {
  return reducer(state, actions)
}

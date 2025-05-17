import { Action, createReducer, on } from '@ngrx/store'
import { IPointState } from './point.model'
import * as fromPoints from './index'

/**
 * État initial du reducer des points
 */
export const initialPointState: IPointState = {
  points: [],
  isLoading: false,
}

/**
 * Reducer principal pour la gestion des points
 */
const reducer = createReducer<IPointState>(
  initialPointState,

  /**
   * Gestion des actions de récupération d'un point
   */
  on(fromPoints.getPoint, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromPoints.getPointSuccess, (state, { onePoint }) => ({
    ...state,
    isLoading: false,
    onePoint,
  })),

  /**
   * Gestion des actions de récupération de tous les points
   */
  on(fromPoints.getPoints, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromPoints.getPointsSuccess, (state, { points }) => ({
    ...state,
    isLoading: false,
    points,
  })),

  /**
   * Gestion des actions de création d'un point
   */
  on(fromPoints.createPoint, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromPoints.createPointSuccess, (state, { point }) => ({
    ...state,
    points: [...state.points, point],
    isLoading: false,
  })),

  /**
   * Gestion des actions de mise à jour d'un point
   */
  on(fromPoints.updatePoint, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromPoints.updatePointSuccess, (state, { point }) => ({
    ...state,
    points: state.points.map((item) => (item.id === point.id ? point : item)),
    isLoading: false,
  })),

  /**
   * Gestion des actions de suppression d'un point
   */
  on(fromPoints.deletePoint, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromPoints.deletePointSuccess, (state, { point }) => ({
    ...state,
    points: state.points.filter((item) => item.id !== point.id),
    isLoading: false,
  })),
)

/**
 * Fonction reducer exportée pour être utilisée par le store
 */
export function pointReducer(
  state = initialPointState,
  actions: Action,
): IPointState {
  return reducer(state, actions)
}

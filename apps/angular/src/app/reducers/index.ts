import { isDevMode } from '@angular/core'
import { ActionReducerMap, MetaReducer } from '@ngrx/store'

export type State = object

export const reducers: ActionReducerMap<State> = {}

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : []

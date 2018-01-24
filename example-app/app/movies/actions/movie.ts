import { Action } from '@ngrx/store';
import { Movie } from '../models/movie';

export enum MovieActionTypes {
  Search = '[Movie] Search',
  SearchComplete = '[Movie] Search Complete',
  SearchError = '[Movie] Search Error',
  Load = '[Movie] Load',
  Select = '[Movie] Select',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class Search implements Action {
  readonly type = MovieActionTypes.Search;

  constructor(public payload: string) {}
}

export class SearchComplete implements Action {
  readonly type = MovieActionTypes.SearchComplete;

  constructor(public payload: Movie[]) {}
}

export class SearchError implements Action {
  readonly type = MovieActionTypes.SearchError;

  constructor(public payload: string) {}
}

export class Load implements Action {
  readonly type = MovieActionTypes.Load;

  constructor(public payload: Movie) {}
}

export class Select implements Action {
  readonly type = MovieActionTypes.Select;

  constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type MovieActions =
  | Search
  | SearchComplete
  | SearchError
  | Load
  | Select;

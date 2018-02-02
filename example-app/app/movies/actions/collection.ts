import { Action } from '@ngrx/store';
import { Movie } from '../models/movie';

export enum CollectionActionTypes {
  AddMovie = '[Collection] Add Movie',
  AddMovieSuccess = '[Collection] Add Movie Success',
  AddMovieFail = '[Collection] Add Movie Fail',
  RemoveMovie = '[Collection] Remove Movie',
  RemoveMovieSuccess = '[Collection] Remove Movie Success',
  RemoveMovieFail = '[Collection] Remove Movie Fail',
  Load = '[Collection] Load',
  LoadSuccess = '[Collection] Load Success',
  LoadFail = '[Collection] Load Fail',

  LoadPopular = '[Collection] LoadPopular',
  LoadPopularSuccess = '[Collection] LoadPopular Success',
  LoadPopularFail = '[Collection] LoadPopular Fail',

  LoadUpcoming = '[Collection] LoadUpcoming',
  LoadUpcomingSuccess = '[Collection] LoadUpcoming Success',
  LoadUpcomingFail = '[Collection] LoadUpcoming Fail',

  LoadTopRated = '[Collection] LoadTopRated',
  LoadTopRatedSuccess = '[Collection] LoadTopRated Success',
  LoadTopRatedFail = '[Collection] LoadTopRated Fail',
}

/**
 * LoadUpcoming Collection Actions
 */
export class LoadTopRated implements Action {
  readonly type = CollectionActionTypes.LoadTopRated;
}

export class LoadTopRatedSuccess implements Action {
  readonly type = CollectionActionTypes.LoadTopRatedSuccess;

  constructor(public payload: Movie[]) {}
}

export class LoadTopRatedFail implements Action {
  readonly type = CollectionActionTypes.LoadTopRatedFail;

  constructor(public payload: any) {}
}

/**
 * LoadUpcoming Collection Actions
 */
export class LoadUpcoming implements Action {
  readonly type = CollectionActionTypes.LoadUpcoming;
}

export class LoadUpcomingSuccess implements Action {
  readonly type = CollectionActionTypes.LoadUpcomingSuccess;

  constructor(public payload: Movie[]) {}
}

export class LoadUpcomingFail implements Action {
  readonly type = CollectionActionTypes.LoadUpcomingFail;

  constructor(public payload: any) {}
}

/**
 * LoadPopular Collection Actions
 */
export class LoadPopular implements Action {
  readonly type = CollectionActionTypes.LoadPopular;
}

export class LoadPopularSuccess implements Action {
  readonly type = CollectionActionTypes.LoadPopularSuccess;

  constructor(public payload: Movie[]) {}
}

export class LoadPopularFail implements Action {
  readonly type = CollectionActionTypes.LoadPopularFail;

  constructor(public payload: any) {}
}

/**
 * Add Movie to Collection Actions
 */
export class AddMovie implements Action {
  readonly type = CollectionActionTypes.AddMovie;

  constructor(public payload: Movie) {}
}

export class AddMovieSuccess implements Action {
  readonly type = CollectionActionTypes.AddMovieSuccess;

  constructor(public payload: Movie) {}
}

export class AddMovieFail implements Action {
  readonly type = CollectionActionTypes.AddMovieFail;

  constructor(public payload: Movie) {}
}

/**
 * Remove Movie from Collection Actions
 */
export class RemoveMovie implements Action {
  readonly type = CollectionActionTypes.RemoveMovie;

  constructor(public payload: Movie) {}
}

export class RemoveMovieSuccess implements Action {
  readonly type = CollectionActionTypes.RemoveMovieSuccess;

  constructor(public payload: Movie) {}
}

export class RemoveMovieFail implements Action {
  readonly type = CollectionActionTypes.RemoveMovieFail;

  constructor(public payload: Movie) {}
}

/**
 * Load Collection Actions
 */
export class Load implements Action {
  readonly type = CollectionActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = CollectionActionTypes.LoadSuccess;

  constructor(public payload: Movie[]) {}
}

export class LoadFail implements Action {
  readonly type = CollectionActionTypes.LoadFail;

  constructor(public payload: any) {}
}

export type CollectionActions =
  | AddMovie
  | AddMovieSuccess
  | AddMovieFail
  | RemoveMovie
  | RemoveMovieSuccess
  | RemoveMovieFail
  | Load
  | LoadSuccess
  | LoadFail
  | LoadPopular
  | LoadPopularSuccess
  | LoadPopularFail
  | LoadUpcoming
  | LoadUpcomingSuccess
  | LoadUpcomingFail
  | LoadTopRated
  | LoadTopRatedSuccess
  | LoadTopRatedFail;

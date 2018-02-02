import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import { Load } from './../actions/movie';

import {
  CollectionActions,
  LoadFail,
  LoadSuccess,
  LoadPopularFail,
  LoadPopularSuccess,
  LoadUpcomingFail,
  LoadUpcomingSuccess,
  LoadTopRatedFail,
  LoadTopRatedSuccess,
  AddMovieSuccess,
  AddMovieFail,
  CollectionActionTypes,
  RemoveMovie,
  RemoveMovieFail,
  RemoveMovieSuccess,
  AddMovie,
} from './../actions/collection';
import { Movie } from '../models/movie';
import { switchMap, toArray, map, catchError, mergeMap } from 'rxjs/operators';
import { TmdbService } from '../../core/services/tmdb.service';

@Injectable()
export class CollectionEffects {
  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the database open call in `defer` makes
   * effect easier to test.
   */
  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('movies_app');
  });

  @Effect()
  loadPopularCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.LoadPopular),
    switchMap(() =>
      this.tmdbService
        .getMoviesPopular()
        .pipe(
          map((movies: Movie[]) => new LoadPopularSuccess(movies)),
          catchError(error => of(new LoadPopularFail(error)))
        )
    )
  );

  @Effect()
  loadTopRatedCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.LoadTopRated),
    switchMap(() =>
      this.tmdbService
        .getMoviesTopRated()
        .pipe(
          map((movies: Movie[]) => new LoadTopRatedSuccess(movies)),
          catchError(error => of(new LoadTopRatedFail(error)))
        )
    )
  );

  @Effect()
  loadUpcomingCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.LoadUpcoming),
    switchMap(() =>
      this.tmdbService
        .getMoviesUpcoming()
        .pipe(
          map((movies: Movie[]) => new LoadUpcomingSuccess(movies)),
          catchError(error => of(new LoadUpcomingFail(error)))
        )
    )
  );

  @Effect()
  loadCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.Load),
    switchMap(() =>
      this.db
        .query('movies')
        .pipe(
          toArray(),
          map((movies: Movie[]) => new LoadSuccess(movies)),
          catchError(error => of(new LoadFail(error)))
        )
    )
  );

  @Effect()
  addMovieToCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.AddMovie),
    map((action: AddMovie) => action.payload),
    mergeMap(movie =>
      this.db
        .insert('movies', [movie])
        .pipe(
          map(() => new AddMovieSuccess(movie)),
          catchError(() => of(new AddMovieFail(movie)))
        )
    )
  );

  @Effect()
  removeMovieFromCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.RemoveMovie),
    map((action: RemoveMovie) => action.payload),
    mergeMap(movie =>
      this.db
        .executeWrite('movies', 'delete', [movie.id])
        .pipe(
          map(() => new RemoveMovieSuccess(movie)),
          catchError(() => of(new RemoveMovieFail(movie)))
        )
    )
  );

  constructor(
    private actions$: Actions,
    private db: Database,
    private tmdbService: TmdbService
  ) {}
}

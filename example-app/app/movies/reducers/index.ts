import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromSearch from './search';
import * as fromMovies from './movies';
import * as fromCollection from './collection';
import * as fromRoot from '../../reducers';

export interface MoviesState {
  search: fromSearch.State;
  movies: fromMovies.State;
  collection: fromCollection.State;
}

export interface State extends fromRoot.State {
  movies: MoviesState;
}

export const reducers = {
  search: fromSearch.reducer,
  movies: fromMovies.reducer,
  collection: fromCollection.reducer,
};

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `movies` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.moviesState$ = state$.pipe(select(getMoviesState));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getMoviesState = createFeatureSelector<MoviesState>('movies');

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getMovieEntitiesState = createSelector(
  getMoviesState,
  state => state.movies
);

export const getSelectedMovieId = createSelector(
  getMovieEntitiesState,
  fromMovies.getSelectedId
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reducers boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: getMovieIds,
  selectEntities: getMovieEntities,
  selectAll: getAllMovies,
  selectTotal: getTotalMovies,
} = fromMovies.adapter.getSelectors(getMovieEntitiesState);

export const getSelectedMovie = createSelector(
  getMovieEntities,
  getSelectedMovieId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Just like with the movies selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
export const getSearchState = createSelector(
  getMoviesState,
  (state: MoviesState) => state.search
);

export const getSearchMovieIds = createSelector(
  getSearchState,
  fromSearch.getIds
);
export const getSearchQuery = createSelector(
  getSearchState,
  fromSearch.getQuery
);
export const getSearchLoading = createSelector(
  getSearchState,
  fromSearch.getLoading
);
export const getSearchError = createSelector(
  getSearchState,
  fromSearch.getError
);

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of movies in the store.
 */
export const getSearchResults = createSelector(
  getMovieEntities,
  getSearchMovieIds,
  (movies, searchIds) => {
    return searchIds.map(id => movies[id]);
  }
);

export const getCollectionState = createSelector(
  getMoviesState,
  (state: MoviesState) => state.collection
);

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromCollection.getLoading
);
export const getCollectionMovieIds = createSelector(
  getCollectionState,
  fromCollection.getIds
);

export const getMovieCollection = createSelector(
  getMovieEntities,
  getCollectionMovieIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const isSelectedMovieInCollection = createSelector(
  getCollectionMovieIds,
  getSelectedMovieId,
  (ids, selected) => {
    return ids.indexOf(selected) > -1;
  }
);

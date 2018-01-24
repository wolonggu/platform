import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { empty } from 'rxjs/observable/empty';
import { MovieEffects, SEARCH_SCHEDULER, SEARCH_DEBOUNCE } from './movie';
import { TmdbService } from '../../core/services/tmdb.service';
import { Observable } from 'rxjs/Observable';
import { Search, SearchComplete, SearchError } from '../actions/movie';
import { Movie } from '../models/movie';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('MovieEffects', () => {
  let effects: MovieEffects;
  let googleMoviesService: any;
  let actions$: TestActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieEffects,
        {
          provide: TmdbService,
          useValue: { searchMovies: jest.fn() },
        },
        { provide: Actions, useFactory: getActions },
        { provide: SEARCH_SCHEDULER, useFactory: getTestScheduler },
        { provide: SEARCH_DEBOUNCE, useValue: 30 },
      ],
    });

    effects = TestBed.get(MovieEffects);
    googleMoviesService = TestBed.get(TmdbService);
    actions$ = TestBed.get(Actions);
  });

  describe('search$', () => {
    it('should return a new movie.SearchComplete, with the movies, on success, after the de-bounce', () => {
      const movie1 = { id: '111', volumeInfo: {} } as Movie;
      const movie2 = { id: '222', volumeInfo: {} } as Movie;
      const movies = [movie1, movie2];
      const action = new Search('query');
      const completion = new SearchComplete(movies);

      actions$.stream = hot('-a---', { a: action });
      const response = cold('-a|', { a: movies });
      const expected = cold('-----b', { b: completion });
      googleMoviesService.searchMovies = jest.fn(() => response);

      expect(effects.search$).toBeObservable(expected);
    });

    it('should return a new movie.SearchError if the movies service throws', () => {
      const action = new Search('query');
      const completion = new SearchError('Unexpected Error. Try again later.');
      const error = 'Unexpected Error. Try again later.';

      actions$.stream = hot('-a---', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('-----b', { b: completion });
      googleMoviesService.searchMovies = jest.fn(() => response);

      expect(effects.search$).toBeObservable(expected);
    });

    it(`should not do anything if the query is an empty string`, () => {
      const action = new Search('');

      actions$.stream = hot('-a---', { a: action });
      const expected = cold('---');

      expect(effects.search$).toBeObservable(expected);
    });
  });
});

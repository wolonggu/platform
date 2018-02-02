import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { empty } from 'rxjs/observable/empty';
import { cold, hot } from 'jasmine-marbles';
import { CollectionEffects } from './collection';
import { Database } from '@ngrx/db';
import { Movie } from '../models/movie';
import * as collection from '../actions/collection';
import { Observable } from 'rxjs/Observable';
import { TmdbService } from '../../core/services/tmdb.service';

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

describe('CollectionEffects', () => {
  let db: any;
  let effects: CollectionEffects;
  let actions$: TestActions;

  const movie1 = { id: '111', volumeInfo: {} } as Movie;
  const movie2 = { id: '222', volumeInfo: {} } as Movie;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CollectionEffects,
        {
          provide: Database,
          useValue: {
            open: jest.fn(),
            query: jest.fn(),
            insert: jest.fn(),
            executeWrite: jest.fn(),
          },
        },
        { provide: Actions, useFactory: getActions },

        {
          provide: TmdbService,
          useValue: {
            searchMovies: jest.fn(),
            getMoviesLatest: jest.fn(),
            getMoviesPopular: jest.fn(),
            getMoviesTopRated: jest.fn(),
            getMoviesUpcoming: jest.fn(),
            getMovieDetail: jest.fn(),
            getMovieImages: jest.fn(),
            getMovieAlternateTitles: jest.fn(),
          },
        },
      ],
    });

    db = TestBed.get(Database);
    effects = TestBed.get(CollectionEffects);
    actions$ = TestBed.get(Actions);
  });

  describe('openDB$', () => {
    it('should call db.open when initially subscribed to', () => {
      effects.openDB$.subscribe();
      expect(db.open).toHaveBeenCalledWith('movies_app');
    });
  });

  describe('loadCollection$', () => {
    it('should return a collection.LoadSuccess, with the movies, on success', () => {
      const action = new collection.Load();
      const completion = new collection.LoadSuccess([movie1, movie2]);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a-b|', { a: movie1, b: movie2 });
      const expected = cold('-----c', { c: completion });
      db.query = jest.fn(() => response);

      expect(effects.loadCollection$).toBeObservable(expected);
    });

    it('should return a collection.LoadFail, if the query throws', () => {
      const action = new collection.Load();
      const error = 'Error!';
      const completion = new collection.LoadFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      db.query = jest.fn(() => response);

      expect(effects.loadCollection$).toBeObservable(expected);
    });
  });

  describe('addMovieToCollection$', () => {
    it('should return a collection.AddMovieSuccess, with the movie, on success', () => {
      const action = new collection.AddMovie(movie1);
      const completion = new collection.AddMovieSuccess(movie1);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-b', { b: true });
      const expected = cold('--c', { c: completion });
      db.insert = jest.fn(() => response);

      expect(effects.addMovieToCollection$).toBeObservable(expected);
      expect(db.insert).toHaveBeenCalledWith('movies', [movie1]);
    });

    it('should return a collection.AddMovieFail, with the movie, when the db insert throws', () => {
      const action = new collection.AddMovie(movie1);
      const completion = new collection.AddMovieFail(movie1);
      const error = 'Error!';

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      db.insert = jest.fn(() => response);

      expect(effects.addMovieToCollection$).toBeObservable(expected);
    });

    describe('removeMovieFromCollection$', () => {
      it('should return a collection.RemoveMovieSuccess, with the movie, on success', () => {
        const action = new collection.RemoveMovie(movie1);
        const completion = new collection.RemoveMovieSuccess(movie1);

        actions$.stream = hot('-a', { a: action });
        const response = cold('-b', { b: true });
        const expected = cold('--c', { c: completion });
        db.executeWrite = jest.fn(() => response);

        expect(effects.removeMovieFromCollection$).toBeObservable(expected);
        expect(db.executeWrite).toHaveBeenCalledWith('movies', 'delete', [
          movie1.id,
        ]);
      });

      it('should return a collection.RemoveMovieFail, with the movie, when the db insert throws', () => {
        const action = new collection.RemoveMovie(movie1);
        const completion = new collection.RemoveMovieFail(movie1);
        const error = 'Error!';

        actions$.stream = hot('-a', { a: action });
        const response = cold('-#', {}, error);
        const expected = cold('--c', { c: completion });
        db.executeWrite = jest.fn(() => response);

        expect(effects.removeMovieFromCollection$).toBeObservable(expected);
        expect(db.executeWrite).toHaveBeenCalledWith('movies', 'delete', [
          movie1.id,
        ]);
      });
    });
  });
});

import { reducer } from './movies';
import * as fromMovies from './movies';
import { SearchComplete, Load, Select } from '../actions/movie';
import { Movie, generateMockMovie } from '../models/movie';
import { LoadSuccess } from '../actions/collection';

describe('MoviesReducer', () => {
  const movie1 = generateMockMovie();
  const movie2 = { ...movie1, id: '222' };
  const movie3 = { ...movie1, id: '333' };
  const initialState: fromMovies.State = {
    ids: [movie1.id, movie2.id],
    entities: {
      [movie1.id]: movie1,
      [movie2.id]: movie2,
    },
    selectedMovieId: null,
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toMatchSnapshot();
    });
  });

  describe('SEARCH_COMPLETE & LOAD_SUCCESS', () => {
    function noExistingMovies(
      action: any,
      moviesInitialState: any,
      initialState: any,
      movies: Movie[]
    ) {
      const createAction = new action(movies);

      const result = reducer(moviesInitialState, createAction);

      expect(result).toMatchSnapshot();
    }

    function existingMovies(action: any, initialState: any, movies: Movie[]) {
      // should not replace existing movies
      const differentMovie2 = { ...movies[0], foo: 'bar' };
      const createAction = new action([movies[1], differentMovie2]);

      const expectedResult = {
        ids: [...initialState.ids, movies[1].id],
        entities: {
          ...initialState.entities,
          [movies[1].id]: movies[1],
        },
        selectedMovieId: null,
      };

      const result = reducer(initialState, createAction);

      expect(result).toMatchSnapshot();
    }

    it('should add all movies in the payload when none exist', () => {
      noExistingMovies(SearchComplete, fromMovies.initialState, initialState, [
        movie1,
        movie2,
      ]);

      noExistingMovies(LoadSuccess, fromMovies.initialState, initialState, [
        movie1,
        movie2,
      ]);
    });

    it('should add only new movies when movies already exist', () => {
      existingMovies(SearchComplete, initialState, [movie2, movie3]);

      existingMovies(LoadSuccess, initialState, [movie2, movie3]);
    });
  });

  describe('LOAD', () => {
    const expectedResult = {
      ids: [movie1.id],
      entities: {
        [movie1.id]: movie1,
      },
      selectedMovieId: null,
    };

    it('should add a single movie, if the movie does not exist', () => {
      const action = new Load(movie1);

      const result = reducer(fromMovies.initialState, action);

      expect(result).toMatchSnapshot();
    });

    it('should return the existing state if the movie exists', () => {
      const action = new Load(movie1);

      const result = reducer(expectedResult, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('SELECT', () => {
    it('should set the selected movie id on the state', () => {
      const action = new Select(movie1.id);

      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    describe('getSelectedId', () => {
      it('should return the selected id', () => {
        const result = fromMovies.getSelectedId({
          ...initialState,
          selectedMovieId: movie1.id,
        });

        expect(result).toMatchSnapshot();
      });
    });
  });
});

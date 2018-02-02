import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { MovieImage } from '../../movies/models/movie-image';
import { MovieTitle } from '../../movies/models/movie-title';
import { Movie, MovieResult } from '../../movies/models/movie';
import { TmdbConfigService } from '../../movies/services/tmdb-config.service';

@Injectable()
export class TmdbService {
  private API_PATH: string = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient, private config: TmdbConfigService) {}

  searchMovies(query: string): Observable<Movie[]> {
    return this.http
      .get<MovieResult>(
        `${this.API_PATH}/search/movie?api_key=${
          this.config.apiKey
        }&language=en-US&query=${query}`
      )
      .pipe(map(data => data['results']));
  }

  getMoviesLatest(): Observable<Movie[]> {
    return this.http
      .get<MovieResult>(
        `${this.API_PATH}/movie/latest?api_key=${
          this.config.apiKey
        }&language=en-US`
      )
      .pipe(map(data => data['results']));
  }

  getMoviesPopular(): Observable<Movie[]> {
    return this.http
      .get<MovieResult>(
        `${this.API_PATH}/movie/popular?api_key=${
          this.config.apiKey
        }&language=en-US`
      )
      .pipe(map(data => data['results']));
  }

  getMoviesTopRated(): Observable<Movie[]> {
    return this.http
      .get<MovieResult>(
        `${this.API_PATH}/movie/top_rated?api_key=${
          this.config.apiKey
        }&language=en-US`
      )
      .pipe(map(data => data['results']));
  }

  getMoviesUpcoming(): Observable<Movie[]> {
    return this.http
      .get<MovieResult>(
        `${this.API_PATH}/movie/upcoming?api_key=${
          this.config.apiKey
        }&language=en-US`
      )
      .pipe(map(data => data['results']));
  }

  getMovieDetail(movie_id: string): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.API_PATH}/${movie_id}?api_key=${
        this.config.apiKey
      }&language=en-US`
    );
  }

  getMovieImages(movie_id: string): Observable<MovieImage> {
    return this.http.get<MovieImage>(
      `${this.API_PATH}/${movie_id}/imags?api_key=${
        this.config.apiKey
      }&language=en-US`
    );
  }

  getMovieAlternateTitles(movie_id: string): Observable<MovieTitle> {
    return this.http.get<MovieTitle>(
      `${this.API_PATH}/${movie_id}/alternative_titles?api_key=${
        this.config.apiKey
      }&language=en-US`
    );
  }
}

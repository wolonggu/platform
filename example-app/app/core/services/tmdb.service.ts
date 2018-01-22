import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { MovieImage } from '../../movies/models/movie-image';
import { MovieTitle } from '../../movies/models/movie-title';
import { Movie } from '../../movies/models/movie';
import { TmdbConfigService } from '../../movies/services/tmdb-config.service';

@Injectable()
export class TmdbService {
  private API_PATH: string = 'https://api.themoviedb.org/3/';

  constructor(private http: HttpClient, private config: TmdbConfigService) {}

  getMoviesLatest(): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `${this.API_PATH}/movie?api_key=${this.config.apiKey}&language=en-US`
    );
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

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../models/movie';
import { Store, select } from '@ngrx/store';
import * as fromMovies from '../reducers';
import * as movie from '../actions/movie';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

@Component({
  selector: 'bc-movie-list',
  template: `
  <div class="movie-search-wrapper">
    <div class="movie-search">

    <mat-card>
      <mat-card-title>Find a movie</mat-card-title>
      <mat-card-content>
        <mat-input-container>
          <input matInput placeholder="Search for a movie" [value]="searchQuery$ | async" (keyup)="search($event.target.value)">
        </mat-input-container>
        <mat-spinner *ngIf="loading$ | async" [diameter]="30" [strokeWidth]="3"></mat-spinner>
      </mat-card-content>
      <mat-card-footer><span *ngIf="error$ | async">{{error$ | async}}</span></mat-card-footer>
    </mat-card>
    </div>
    <div class="row">
      <div class="col col-md-4" *ngFor="let movie of movies$ | async">
        <div class="card">
          <img class="card-img-top" src="{{ getImgUrl(movie) }}" alt="Card image cap">
          <div class="card-block">
            <h4 class="card-title">{{ movie.original_title }}</h4>
            <p class="card-text">{{ movie.overview }}</p>
          </div>

        </div>
      </div>
    </div>
  </div>

  `,
  styles: [
    `
    :host {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .movie-search-wrapper {
      flex: 1;
    }

    mat-card-title,
    mat-card-content,
    mat-card-footer {
      display: flex;
      justify-content: center;
    }

    mat-card-footer {
      color: #FF0000;s
      padding: 5px 0;
    }

    .mat-form-field {
      min-width: 300px;
    }

    .mat-spinner {
      position: relative;
      top: 10px;
      left: 10px;
      opacity: 0.0;
      padding-left: 60px; // Make room for the spinner
    }

    .mat-spinner.show {
      opacity: 1.0;
    }
    `,
  ],
})
export class MovieListComponent implements OnInit {
  movies$: Observable<Movie[]>;
  searchQuery$: Observable<string>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  TMDB_IMG_URL = 'https://image.tmdb.org/t/p/w780';

  private open: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private store: Store<fromMovies.State>, private router: Router) {
    this.movies$ = store.pipe(select(fromMovies.getSearchResults));
    this.searchQuery$ = store.pipe(select(fromMovies.getSearchQuery), take(1));
    this.loading$ = store.pipe(select(fromMovies.getSearchLoading));
    this.error$ = store.pipe(select(fromMovies.getSearchError));
  }

  ngOnInit() {}

  gotoMoviesPopular(): void {
    this.router.navigateByUrl('/movies/movie-popular');
  }

  search(query: string) {
    this.store.dispatch(new movie.Search(query));
  }

  getImgUrl(movie: Movie) {
    return `${this.TMDB_IMG_URL}${movie.backdrop_path || movie.poster_path}`;
  }
}

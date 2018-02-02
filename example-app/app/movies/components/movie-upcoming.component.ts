import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../models/movie';
import { Store, select } from '@ngrx/store';
import * as fromMovies from '../reducers';
import * as movie from '../actions/movie';
import { take } from 'rxjs/operators';
import * as collection from '../actions/collection';
@Component({
  selector: 'bc-movie',
  template: `
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
  `,
  styles: [
    `
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
    `,
  ],
})
export class MovieUpcomingComponent implements OnInit {
  movies$: Observable<Movie[]>;

  TMDB_IMG_URL = 'https://image.tmdb.org/t/p/w780';

  constructor(private store: Store<fromMovies.State>) {
    this.movies$ = store.pipe(select(fromMovies.getLoadedMovies));
  }

  ngOnInit() {
    this.store.dispatch(new collection.LoadUpcoming());
  }

  getImgUrl(movie: Movie) {
    return `${this.TMDB_IMG_URL}${movie.backdrop_path || movie.poster_path}`;
  }
}

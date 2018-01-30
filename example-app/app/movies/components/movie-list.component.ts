import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../models/movie';
import { Store, select } from '@ngrx/store';
import * as fromMovies from '../reducers';
import * as movie from '../actions/movie';
import { take } from 'rxjs/operators';

@Component({
  selector: 'bc-movie-list',
  template: `
  <div class="container">
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
    <div class="col" *ngFor="let movie of movies | async">
      <div class="card">


      </div>
    </div>
  </div>

  `,
  styles: [],
})
export class MovieListComponent implements OnInit {
  movies$: Observable<Movie[]>;
  searchQuery$: Observable<string>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromMovies.State>) {
    this.movies$ = store.pipe(select(fromMovies.getSearchResults));
    this.searchQuery$ = store.pipe(select(fromMovies.getSearchQuery), take(1));
    this.loading$ = store.pipe(select(fromMovies.getSearchLoading));
    this.error$ = store.pipe(select(fromMovies.getSearchError));
  }

  ngOnInit() {}

  search(query: string) {
    this.store.dispatch(new movie.Search(query));
  }
}

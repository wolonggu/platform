import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bc-route',
  template: `
  <div class="router-root">
    <div class="sidebar">
    <div class="list-group">
      <a href="#/movies/movie-popular" class="list-group-item list-group-item-action">
        Popular
      </a>
      <a href="#/movies/movie-toprated" class="list-group-item list-group-item-action">Top rated</a>
      <a href="#/movies/movie-upcoming" class="list-group-item list-group-item-action">Upcoming</a>
      <a href="#/movies" class="list-group-item list-group-item-action">Find a movie</a>
    </div>
    </div>
    <div class="full-width"><router-outlet></router-outlet></div>
  </div>
  `,
  styles: [
    `
      .router-root {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: stretch;
      }

      .sidebar {
        width: 200px;
        font-weight: bold;
      }

      .sidebar a:hover {
        background-color: yellow;
      }

      .full-width {
        flex: 1;
      }
    `,
  ],
})
export class RouteComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  gotoMoviesPopular(): void {
    this.router.navigateByUrl('/movies/movie-popular');
  }
}

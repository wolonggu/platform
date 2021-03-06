import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './components/movie.component';
import { MovieListComponent } from './components/movie-list.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './reducers';
import { MaterialModule } from '../material';
import { MovieEffects } from './effects/movie';
import { CollectionEffects } from './effects/collection';
import { NgcFloatButtonModule } from 'ngc-float-button';
import { RouteComponent } from './containers/route.component';
import { MovieLatestComponent } from './components/movie-latest.component';
import { MovieUpcomingComponent } from './components/movie-upcoming.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    NgcFloatButtonModule,
    StoreModule.forFeature('movies', reducers),
    EffectsModule.forFeature([MovieEffects, CollectionEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: RouteComponent,
        children: [
          {
            path: '',
            component: MovieListComponent,
            data: {
              // Uses text property (Person)
              breadcrumbs: true,
              text: 'search',
            },
          },
          {
            path: 'movie-list',
            component: MovieListComponent,
            data: {
              // Uses text property (Person)
              breadcrumbs: true,
              text: 'search',
            },
          },
          {
            path: 'movie-popular',
            component: MovieComponent,
            data: {
              // Uses text property (Person)
              breadcrumbs: true,
              text: 'Popular',
            },
          },
          {
            path: 'movie-upcoming',
            component: MovieUpcomingComponent,
            data: {
              // Uses text property (Person)
              breadcrumbs: true,
              text: 'Popular',
            },
          },
          {
            path: 'movie-toprated',
            component: MovieLatestComponent,
            data: {
              // Uses text property (Person)
              breadcrumbs: true,
              text: 'Popular',
            },
          },
          {
            path: ':id',
            component: MovieComponent,
            data: {
              // Uses text property (Person)
              breadcrumbs: true,
              text: 'search',
            },
          },
        ],
      },
    ]),
  ],
  declarations: [
    MovieComponent,
    MovieListComponent,
    RouteComponent,
    MovieLatestComponent,
    MovieUpcomingComponent,
  ],
})
export class MoviesModule {}

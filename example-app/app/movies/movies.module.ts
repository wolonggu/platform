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
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature('movies', reducers),
    EffectsModule.forFeature([MovieEffects, CollectionEffects]),
    RouterModule.forChild([
      { path: '', component: MovieListComponent },
      { path: 'movie-list', component: MovieListComponent },
      {
        path: ':id',
        component: MovieComponent,
      },
    ]),
  ],
  declarations: [MovieComponent, MovieListComponent],
})
export class MoviesModule {}

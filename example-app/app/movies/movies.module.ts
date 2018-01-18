import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './components/movie.component';
import { MovieListComponent } from './components/movie-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MovieComponent, MovieListComponent],
})
export class MoviesModule {}

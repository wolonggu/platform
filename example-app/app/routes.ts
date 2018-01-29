import { Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.service';
import { NotFoundPageComponent } from './core/containers/not-found-page';

export const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  {
    path: 'books',
    loadChildren: './books/books.module#BooksModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'movies',
    loadChildren: './movies/movies.module#MoviesModule',
  },
  {
    path: 'outdoor',
    loadChildren: './outdoor/outdoor.module#OutdoorModule',
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
  },
  { path: '**', component: NotFoundPageComponent },
];

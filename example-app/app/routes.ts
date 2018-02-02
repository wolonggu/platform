import { Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.service';
import { NotFoundPageComponent } from './core/containers/not-found-page';

export const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  {
    path: 'books',
    loadChildren: './books/books.module#BooksModule',
    canActivate: [AuthGuard],
    data: {
      // Uses text property (Person)
      breadcrumbs: true,
      text: 'Books',
    },
  },
  {
    path: 'movies',
    loadChildren: './movies/movies.module#MoviesModule',
    data: {
      // Uses text property (Person)
      breadcrumbs: true,
      text: 'Movies',
    },
  },
  {
    path: 'outdoor',
    loadChildren: './outdoor/outdoor.module#OutdoorModule',
    data: {
      // Uses text property (Person)
      breadcrumbs: true,
      text: 'Outdoor',
    },
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    data: {
      // Uses text property (Person)
      breadcrumbs: true,
      text: 'Admin',
    },
  },
  { path: '**', component: NotFoundPageComponent },
];

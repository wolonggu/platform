import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './containers/app';
import { NotFoundPageComponent } from './containers/not-found-page';
import { LayoutComponent } from './components/layout';
import { NavItemComponent } from './components/nav-item';
import { SidenavComponent } from './components/sidenav';
import { ToolbarComponent } from './components/toolbar';
import { MaterialModule } from '../material';

import { GoogleBooksService } from './services/google-books';
import { TmdbService } from './services/tmdb.service';
import { TmdbConfigService } from '../movies/services/tmdb-config.service';
export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
];

import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { SidebarModule } from 'ng-sidebar';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    McBreadcrumbsModule.forRoot(),
    SidebarModule.forRoot(),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [GoogleBooksService, TmdbService, TmdbConfigService],
    };
  }
}

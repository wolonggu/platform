import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromAuth from '../../auth/reducers';
import * as layout from '../actions/layout';
import * as Auth from '../../auth/actions/auth';

@Component({
  selector: 'bc-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <!-- Container for sidebar(s) + page content -->
  <ng-sidebar-container>

    <!-- A sidebar -->
    <ng-sidebar [(opened)]="_opened">
      <p>Sidebar contents</p>
    </ng-sidebar>

    <!-- Page content -->
    <div ng-sidebar-content>
    <div class="wrapper">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">Home</a>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <a class="nav-link" *ngIf="loggedIn$ | async" routerLink="/admin">Admin Dashboard <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" *ngIf="loggedIn$ | async" routerLink="/movies">Movies</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" *ngIf="loggedIn$ | async" routerLink="/outdoor">Outdoor projects</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" *ngIf="loggedIn$ | async" routerLink="/books/find">Find your books</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" *ngIf="loggedIn$ | async">Sign out</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
      <mc-breadcrumbs></mc-breadcrumbs>
      <router-outlet></router-outlet>
    </div>

    </div>

  </ng-sidebar-container>
  `,

  styles: [
    `
    :host {
      height: 100vh;
    }
    .wrapper {
      flex: 1;
      flex-direction: column;
      display: flex;
    }
:host {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
`,
  ],
})
export class AppComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  private _opened: boolean = false;

  constructor(private store: Store<fromRoot.State>) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  }

  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(new layout.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new layout.OpenSidenav());
  }

  logout() {
    this.closeSidenav();

    this.store.dispatch(new Auth.Logout());
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}

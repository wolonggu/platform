import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard.component';
import { ProfileSettingComponent } from './components/profile-setting.component';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'profile-setting',
        component: ProfileSettingComponent,
      },
      { path: '', component: DashboardComponent },
    ]),
  ],
  declarations: [DashboardComponent, ProfileSettingComponent],
})
export class AdminModule {}

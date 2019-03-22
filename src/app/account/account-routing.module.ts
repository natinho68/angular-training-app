import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlineGuard } from '@ngx-pwa/offline';

import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { AuthGuard } from '../core/auth/auth.guard';

const routes: Routes = [
  { path: '', children: [
    { path: 'register', component: RegisterComponent },
    { path: 'reactive', component: ReactiveComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    // TODO: Add ProfileGuard
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}

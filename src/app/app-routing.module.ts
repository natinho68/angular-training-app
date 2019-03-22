import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

// TODO: Lazy-load admin module and other modules
const routes: Routes = [
  { path: 'account', loadChildren: './account/account.module#AccountModule'},
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canLoad: [AuthGuard]},
  { path: '', redirectTo: 'cinema/movies', pathMatch: 'full' },
  { path: '**', redirectTo: 'oops/not-found' },
];

@NgModule({
  // TODO: Manage lazy-loading strategy
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

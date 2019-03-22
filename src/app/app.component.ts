import { Component } from '@angular/core';
import { Network } from '@ngx-pwa/offline';
import { AuthService } from './core/auth';

@Component({
  selector: 'cinemapp-root',
  template: `
    <div>
      <cinemapp-header [isAuthenticated]="isAuthenticated$ | async"></cinemapp-header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {

  // TODO: Get the authentification status from the Auth service
  isAuthenticated$ = this.auth.isAuthenticated;

  // TODO: Inject the Auth service
  constructor(private network: Network, private auth: AuthService) {}

}

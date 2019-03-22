import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cinemapp-header',
  template: `
    <header id="header">
      <div id="logo">
        <img src="assets/logo.svg" alt="Cinemapp" width="60" height="60">
      </div>
      <cinemapp-menu [isAuthenticated]="isAuthenticated" class="underlined"></cinemapp-menu>
    </header>
  `,
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() isAuthenticated = true;
}

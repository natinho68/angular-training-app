import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  template: `
    <mat-card>
      <mat-card-title>Service inaccessible</mat-card-title>
      <mat-card-content>
        <p>Le service est momentanément indisponible. Merci de réessayer ultérieurement.</p>
        <p *ngIf="isAuthenticated"><a routerLink="/account/profile">Accéder à vos réservations</a></p>
      </mat-card-content>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnavailableComponent {

  isAuthenticated = false;

  constructor() {}

}

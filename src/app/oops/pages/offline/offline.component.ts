import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  template: `
    <mat-card>
      <mat-card-title>Mode hors ligne</mat-card-title>
      <mat-card-content>
        <p>Cette page nécessite une connexion Internet.</p>
        <p *ngIf="isAuthenticated"><a routerLink="/account/profile">Accéder à vos réservations</a></p>
      </mat-card-content>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfflineComponent {

  isAuthenticated = false;

  constructor() {}

}

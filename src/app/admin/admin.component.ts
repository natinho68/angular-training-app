import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cinemapp-admin',
  template: `
    <mat-card>
      <h1>Administration</h1>
      <p>Lorem ipsum...</p>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {}

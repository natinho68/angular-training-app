import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

import { AccountService } from '../../shared/account.service';

@Component({
  template: `
    <mat-card>
      <!-- TODO: Listen to submit event -->
      <form method="post" (submit)="login()" #loginForm="ngForm">
        <h1>Connexion</h1>
        <ul *ngIf="errors.length">
          <li *ngFor="let error of errors">{{error}}</li>
        </ul>
        <mat-form-field>
          <!-- TODO: Add a binding on the email field -->
          <input type="email" name="email" [(ngModel)]="email" matInput placeholder="Votre adresse e-mail" required autocomplete="email">
          <mat-error>L'e-mail est obligatoire</mat-error>
        </mat-form-field>
        <mat-form-field>
          <!-- TODO: Add a binding on the password field -->
          <input type="password" name="password" [(ngModel)]="password" matInput
          placeholder="Votre mot de passe" required autocomplete="off">
          <mat-error>Le mot de passe est obligatoire</mat-error>
        </mat-form-field>
        <button type="submit" [disabled]="loginForm.invalid" mat-raised-button color="accent">Se connecter</button>
        <p class="center"><a routerLink="../register">Pas encore inscrit/e ? Créez un compte.</a></p>
      </form>
    </mat-card>
  `
})
export class LoginComponent {

  errors: string[] = [];

  email: '';
  password: '';

  constructor(private account: AccountService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {}

  login(): void {

    const loading = this.snackBar.open(`Connexion en cours...`);

    this.account.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {

        if (response.success) {

          this.snackBar.open(`Connexion réussie`, `OK`, { duration: 2000 });

          // TODO: Préserver les paramètres de réservation
          this.router.navigate(['../profile'], { relativeTo: this.route });

        } else {
          this.errors = response.error.split('.').slice(0, -1);
        }

      },
      error: () => {
        this.errors = [`Pas de connexion Internet`];
      },
      complete: () => {
        loading.dismiss();
      }
    });

  }

}


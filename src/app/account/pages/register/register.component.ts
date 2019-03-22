import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { switchMap, filter, debounceTime, map, catchError } from 'rxjs/operators';

import { AccountService } from '../../shared/account.service';
import { AutocompleteService } from '../../shared/autocomplete.service';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  template: `
    <mat-card>
      <!-- TODO: Listen ngSubmit event -->
      <!-- TODO: Add a template reference to the form -->
      <form method="post" (submit)="register()" #registerForm="ngForm">
        <h1>Inscription</h1>
        <p>Attention : il s'agit d'une app de test. E-mail et mot de passe seront
        visibles en clair par n'importe qui.</p>
        <ul *ngIf="errors.length">
          <li *ngFor="let error of errors">{{error}}</li>
        </ul>
        <mat-form-field>
          <!-- TODO: Add 2-way binding and control validation -->
          <input type="email" name="email" [(ngModel)]="email" #emailControl="ngModel"
          matInput placeholder="Votre adresse e-mail" required autocomplete="email">
          <!-- TODO: Add error feedback for user on empty email -->
          <p [hidden]="emailControl.valid || emailControl.pristine">L'email est obligatoire</p>
        </mat-form-field>
        <mat-form-field>
          <!-- TODO: Add 2-way binding and control validation -->
          <input type="password" name="password" [(ngModel)]="password" matInput
          placeholder="Votre mot de passe" required autocomplete="off">
          <mat-error>Le mot de passe est obligatoire</mat-error>
        </mat-form-field>
        <div>
          <p>J'ai une carte :</p>
          <mat-radio-group name="card">
            <mat-radio-button value="" checked>Non</mat-radio-button>
            <mat-radio-button value="ugc">UGC</mat-radio-button>
            <mat-radio-button value="gaumont">Gaumont</mat-radio-button>
          </mat-radio-group>
        </div>
        <mat-form-field>
          <mat-select name="category" placeholder="Genre de film préféré">
            <mat-option value="">Non spécifié</mat-option>
            <mat-option value="action">Action</mat-option>
            <mat-option value="comedy">Comédie</mat-option>
            <mat-option value="drama">Drame</mat-option>
            <mat-option value="horror">Horreur</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <textarea name="profile" matInput placeholder="A propos de vous" matTextareaAutosize></textarea>
        </mat-form-field>
        <mat-form-field>
          <input type="text" name="city" [formControl]="cityControl" [matAutocomplete]="cityAuto" matInput placeholder="Votre ville">
        </mat-form-field>
        <mat-autocomplete #cityAuto>
          <!-- TODO: Add <mat-option> -->
          <mat-option *ngFor="let suggestion of citySuggestions" [value]="citySuggestions">{{suggestion}}</mat-option>
        </mat-autocomplete>
        <div>
          <mat-checkbox name="conditions" required>
            J'accepte les conditions d'utilisation. *
          </mat-checkbox>
        </div>
        <!-- TODO: Disable submit button until valid inputs -->
        <button type="submit" [disabled]="registerForm.invalid" mat-raised-button color="accent">Valider l'inscription</button>
        <p class="center"><a routerLink="../login">Déjà inscrit/e ? Connectez-vous.</a></p>
      </form>
    </mat-card>
  `,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  errors: string[] = [];
  cityControl = new FormControl();
  email = '';
  password = '';
  citySuggestions: string[];
  citySubscription: Subscription;

  constructor(
    private account: AccountService,
    private autocomplete: AutocompleteService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    // TODO: Autocompletion with RxJS
    this.citySubscription = (this.cityControl.valueChanges as Observable<string>).pipe(
      filter((value) => value.length > 2),
      debounceTime(500),
      switchMap((value) => this.autocomplete.getCitySuggestions(value)),
      catchError(() => of([])),
    ).subscribe((suggestions) => {
      this.citySuggestions = suggestions;
    });
  }

  ngOnDestroy() {
    // TODO: Avoid memory leak
    this.citySubscription.unsubscribe();
  }

  register(): void {

    const loading = this.snackBar.open(`Connexion en cours...`);

    this.account.register({ email: this.email, password: this.password }).subscribe({
      next: (response) => {

        if (response.success) {

          this.snackBar.open(`Inscription réussie`, `OK`, { duration: 2000 });

          this.router.navigate(['../login'], { relativeTo: this.route, queryParamsHandling: 'preserve' });

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

import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { AccountService } from '../../shared/account.service';
import { AutocompleteService } from '../../shared/autocomplete.service';

@Component({
  template: `
    <mat-card>
      <!-- TODO: Add a reactive binding to the form -->
      <form method="post" (ngSubmit)="register()" [formGroup]="form">
        <h1>Inscription</h1>
        <p>Attention : il s'agit d'une app de test. E-mail et mot de passe seront
        visibles en clair par n'importe qui.</p>
        <!-- TODO: Add email, password and city components with form binding -->
        <cinemapp-email-with-validation [form]="form"></cinemapp-email-with-validation>
        <cinemapp-password-with-confirmation [form]="form"></cinemapp-password-with-confirmation>
        <cinemapp-errors [errors]="errors"></cinemapp-errors>
        <button type="submit" mat-raised-button color="accent">Valider l'inscription</button>
        <p class="center"><a routerLink="../login">Déjà inscrit/e ? Connectez-vous.</a></p>
      </form>
    </mat-card>
  `
})
export class ReactiveComponent implements AfterViewInit {

  // TODO: Form builder
  form = this.formBuilder.group({
    email: '',
    password: this.formBuilder.group({
      password1: '',
      password2: '',
      }),
  });

  // TODO: Api observables with manual this-binding

  errors: string[] = [];

  // TODO: Inject FormBuilder
  constructor(
    private account: AccountService,
    private autocomplete: AutocompleteService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder) {}

  ngAfterViewInit() {

    // TODO: Detect changes
    this.changeDetector.detectChanges();


  }

  register(): void {

    const loading = this.snackBar.open(`Connexion en cours...`);

    this.account.register(this.form.value).subscribe({
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

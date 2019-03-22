import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'cinemapp-password-with-confirmation',
  template: `
    <!-- TODO: Add form binding -->
    <div [formGroup]="form">
      <!-- TODO: Add form group name -->
      <div [formGroupName]="name">
        <mat-form-field>
          <!-- TODO: Add form control name -->
          <input type="password" [formControlName]="fieldName1" matInput placeholder="Votre mot de passe" required autocomplete="off">
        </mat-form-field>
        <mat-form-field>
          <!-- TODO: Add form control name -->
          <input type="password" [formControlName]="fieldName2" matInput placeholder="Confirmez-le" autocomplete="off">
        </mat-form-field>
        <!-- TODO: Add mat-error on errors -->
        <mat-error *ngIf="passwordNotMatching">Les mots de passe ne sont pas identiques</mat-error>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordWithConfirmationComponent implements OnInit {

  @Input() form: Readonly<FormGroup>;
  @Input() name = 'password';
  @Input() fieldName1 = 'password1';
  @Input() fieldName2 = 'password2';

  get passwordNotMatching() {
    return (this.form.get(this.name)  as FormControl).hasError('passwordNotMatching');
  }

  ngOnInit() {

    // TODO: Set validator
    (this.form.get(this.name) as FormGroup).setValidators([(group) => {
      const password1 = group.get(this.fieldName1) as FormControl;
      const password2 = group.get(this.fieldName2) as FormControl;
      return (password1.value === password2.value) ?  null : { passwordMatching: true };
    }]);

  }

}

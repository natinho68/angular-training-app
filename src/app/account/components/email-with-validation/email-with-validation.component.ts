import { Component, Input, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, debounceTime, first, tap } from 'rxjs/operators';

@Component({
  selector: 'cinemapp-email-with-validation',
  template: `
    <!-- TODO: Add form binding -->
    <div [formGroup]="form">
      <mat-form-field>
        <!-- TODO: Add form control name -->
        <input type="email" [formControlName]="name" matInput placeholder="Votre adresse e-mail" required autocomplete="email">
        <!-- TODO: Add mat-error on errors -->
      </mat-form-field>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailWithValidationComponent implements OnInit {

  @Input() form: Readonly<FormGroup>;
  @Input() name = 'email';
  @Input() api: (value: string) => Observable<boolean>;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {

    // TODO: Set async validator
    // TODO: Check if there is a value, otherwise observable of null
    // TODO: Catch error
    // TODO: Manual complete with first()
    // TODO: markForCheck()


  }

}

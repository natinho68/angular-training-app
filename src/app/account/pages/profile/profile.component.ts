import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

import { Reservation } from '../../shared/reservation';
import { BookingService } from '../../shared/booking.service';

@Component({
  template: `
    <mat-card>
      <h1>Profil</h1>
      <div *ngIf="reservations$ | async as reservations">
        <p *ngIf="reservations.length">Vos réservations</p>
        <div *ngFor="let reservation of reservations; index as i">
          <ul>
            <li>Film : {{reservation.movieTitle}}</li>
            <li>Cinéma : {{reservation.theaterTitle}}</li>
            <li>Séance : {{reservation.scheduleHour}}</li>
          </ul>
          <p><a (click)="cancel(i)">Annuler cette réservation</a></p>
        </div>
        <p *ngIf="!reservations.length">Vous n'avez pas de réservation en cours.</p>
      </div>
      <p *ngIf="bookingProgress">Réservation en cours...</p>
      <p><a routerLink="../logout">Se déconnecter</a></p>
    </mat-card>
  `
})
export class ProfileComponent implements OnInit {

  reservations$: Observable<Reservation[]> = this.booking.reservations$;
  bookingProgress = false;

  constructor(
    private booking: BookingService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

    const schedule = Number.parseInt(this.route.snapshot.queryParamMap.get('schedule') || '0', 10);

    if (schedule) {

      this.bookingProgress = true;

      this.booking.book(schedule).subscribe({
        next: (response) => {

          if (response.success) {
            this.snackBar.open(`Réservation confirmée`, `OK`, { duration: 2000 });
          } else {
            this.snackBar.open(response.error, `OK`, { duration: 2000 });
          }

        },
        error: () => {
          this.snackBar.open(`Echec de la réservation (pas de connexion Internet)`, `OK`, { duration: 2000 });
        },
        complete: () => {
          this.bookingProgress = false;
        }
      });

    }

  }

  cancel(id: number): void {

    this.booking.cancel(id);

  }

}

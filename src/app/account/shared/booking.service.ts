import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LocalStorage, JSONSchema } from '@ngx-pwa/local-storage';

import { Response } from './response';
import { Reservation } from './reservation';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  get reservations$(): Observable<Reservation[]> {
    return this.reservationsSubject.asObservable();
  }

  private readonly localStorageKey = 'booking';
  private readonly reservationsSchema: JSONSchema = {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        movieTitle: { type: 'string' },
        theaterTitle: { type: 'string' },
        scheduleId: { type: 'number' },
        scheduleHour: { type: 'string' },
      },
      required: ['movieTitle', 'theaterTitle', 'scheduleId', 'scheduleHour']
    }
  };
  private reservationsSubject = new BehaviorSubject<Reservation[]>([]);

  constructor(private http: HttpClient, private localStorage: LocalStorage) {

    this.localStorage.getItem<Reservation[]>(this.localStorageKey, this.reservationsSchema)
      .pipe(catchError(() => of([])))
      .subscribe((reservations) => {

        this.reservationsSubject.next(reservations || []);

      });

  }

  book(schedule: number): Observable<Response<Reservation>> {

    return this.http.post<Response<Reservation>>(`/api/book`, { schedule })
    .pipe(tap((response) => {

      if (response.success && response.data) {

        const newReservations = this.reservationsSubject.getValue();
        newReservations.push(response.data);

        this.reservationsSubject.next(newReservations);

        this.localStorage.setItemSubscribe(this.localStorageKey, newReservations);

      }

    }));

  }

  cancel(id: number): void {

    const newReservations = this.reservationsSubject.getValue();
    newReservations.splice(id, 1);

    this.reservationsSubject.next(newReservations);

    this.localStorage.setItemSubscribe(this.localStorageKey, newReservations);

  }

}

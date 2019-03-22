import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, asyncScheduler, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Response } from './response';
import { Token } from './token';
import { AuthService } from 'src/app/core/auth';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private auth: AuthService) {}

  login(body: { email: string; password: string }): Observable<Response<Token>> {

    return this.http.post<Response<Token>>(`/api/account/login`, body).pipe(tap((response) => {
      if (response.success && response.data) {
        // TODO: Use the Auth service to login
        this.auth.login(response.data.token);
      }
    }));

  }

  logout(): Observable<boolean> {

    return of(true, asyncScheduler).pipe(tap(() => {
      // TODO: Use the Auth service to logout
      this.auth.logout();
    }));

  }

  register(body: { email: string; password: string | { password1: string; password2: string; }; }): Observable<Response> {

    return this.http.post<Response>(`/api/account/register`, body);

  }

  isAvailable(email: string): Observable<boolean> {

    return this.http.get<Response>(`/api/account/available/${email}`).pipe(map((response) => response.success));

  }

}

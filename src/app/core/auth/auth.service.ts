import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly tokenKey = 'access_token';
  token: string | null = null;
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);

  get isAuthenticated() {
    return this.isAuthenticatedSubject.asObservable();
  }

  constructor() {
    this.token = localStorage.getItem(this.tokenKey);
    this.isAuthenticatedSubject.next(this.token ? true : false);
  }

  login(token: string) {
    this.isAuthenticatedSubject.next(true);
    this.token = token;
    localStorage.setItem(this.tokenKey, token);
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
    this.token = null;
    localStorage.removeItem(this.tokenKey);
  }

}

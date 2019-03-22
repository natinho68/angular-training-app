import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // TODO: Inject the auth service
  constructor(private router: Router, private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // TODO: Check if there is a token
    const authReq = !this.auth.token ? req : req.clone({
      // TODO: Add the token in the HTTP header
      headers: req.headers.set('Authorization', `Bearer ${this.auth.token}`)
    });

    return next.handle(authReq).pipe(tap(() => {}, (error) => {

      if ((error instanceof HttpErrorResponse) && (error.status === 401 || error.status === 403)) {
        // TODO: Disconnect with the Auth service
        this.auth.logout();
      }

    }));

  }

}

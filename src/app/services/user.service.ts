import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RegisterForm, respRegister } from '../interfaces/register.interfaces';
import { AuthForm, respAuth, Renovar } from '../interfaces/auth.interfaces';
import { Router } from '@angular/router';

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = environment.urlBase;
  public auth2: any;

  constructor(
    private http: HttpClient,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.googleInit();
  }

  googleInit() {
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id:
            '643002471418-gbeoje9knm640gas5e5j96g249333a2d.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve(this.auth2);
      });
    });
  }

  createUser(formData: RegisterForm): Observable<respRegister> {
    return this.http
      .post<respRegister>(`${this.url}/users/create`, formData)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('token', token);
        })
      );
  }

  loginUser(formData: AuthForm): Observable<respAuth> {
    return this.http.post<respAuth>(`${this.url}/auth/`, formData).pipe(
      tap(({ token, ok }) => {
        console.log('login');
        localStorage.setItem('token', token || '');
      })
    );
  }

  loginGoogle(token: string): Observable<respAuth> {
    console.log(token);
    return this.http.post<respAuth>(`${this.url}/auth/google`, { token }).pipe(
      tap(({ tokenBack, ok, msg }) => {
        console.log(msg);
        console.log(tokenBack);
        localStorage.setItem('token', tokenBack || '');
      })
    );
  }

  renovarToken(): Observable<Renovar> {
    const tokenNavegador = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': tokenNavegador || '',
    });

    return this.http.get<Renovar>(`${this.url}/auth/renew`, { headers }).pipe(
      tap(({ token }) => {
        localStorage.setItem('token', token || '');
      }),
      catchError(({ ok }) => of(ok))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/auth/login');
      });
    });
  }
}

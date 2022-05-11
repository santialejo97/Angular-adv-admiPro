import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RegisterForm, respRegister } from '../interfaces/register.interfaces';
import { AuthForm, respAuth, Renovar } from '../interfaces/auth.interfaces';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuarios.model';
import {
  update,
  User,
  CargarUsers,
  Users,
  Delete,
} from '../interfaces/user.interfaces';

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = environment.urlBase;
  public auth2: any;
  public user!: Usuario;

  constructor(
    private http: HttpClient,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.googleInit();
  }

  get getToken(): string {
    return localStorage.getItem('token') || '';
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
    return this.http.post<respAuth>(`${this.url}/auth/google`, { token }).pipe(
      tap(({ tokenBack, ok, msg }) => {
        console.log(msg);
        console.log(tokenBack);
        localStorage.setItem('token', tokenBack || '');
      })
    );
  }

  renovarToken(): Observable<Renovar> {
    const tokenNavegador = this.getToken;
    const headers = new HttpHeaders({
      'x-token': tokenNavegador || '',
    });

    return this.http.get<Renovar>(`${this.url}/auth/renew`, { headers }).pipe(
      tap(({ token, user }) => {
        const { name, email, role, google, img = '', uid } = user;
        this.user = new Usuario(name, email, '', role, google, img, uid);
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

  update(data: { name: string; email: string }): Observable<update> {
    const headers = new HttpHeaders({
      'x-token': this.getToken || '',
    });
    const body = {
      name: data.name,
      email: data.email,
      role: this.user.role,
    };
    return this.http.put<update>(
      `${this.url}/users/update${this.user.uidUser}`,
      body,
      {
        headers,
      }
    );
  }

  cargarUsuarios(desde: number = 5): Observable<Users> {
    return this.http
      .get<CargarUsers>(`${this.url}/users?page=${desde}`, {
        headers: {
          'x-token': this.getToken || '',
        },
      })
      .pipe(
        delay(300),
        map((resp) => {
          const usuarios = resp.users.map(
            (user) =>
              new Usuario(
                user.name,
                user.email,
                '',
                user.role,
                user.google,
                user.img,
                user.uid
              )
          );

          return { total: resp.total, usuarios };
        })
      );
  }

  eliminarUsuario(user: Usuario): Observable<Delete> {
    console.log('usuario eliminado');
    const headers = new HttpHeaders({
      'x-token': this.getToken,
    });
    return this.http.delete<Delete>(`${this.url}/users/delete${user.uid}`, {
      headers,
    });
  }

  updateRole(user: Usuario): Observable<update> {
    const headers = new HttpHeaders({
      'x-token': this.getToken || '',
    });

    return this.http.put<update>(`${this.url}/users/update${user.uid}`, user, {
      headers,
    });
  }
}

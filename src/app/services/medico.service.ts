import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, delay, map, Observable, of } from 'rxjs';
import {
  cargarMedicos,
  createMedico,
  eliminarMedico,
  medicoID,
} from '../interfaces/medico.interfaces';
import { Medico } from '../models/medicos.model';
import { Hospital } from '../models/hospitales.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  private urlBase: string = environment.urlBase;

  constructor(private http: HttpClient, private router: Router) {}

  get getToken(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return new HttpHeaders({
      'x-token': this.getToken,
    });
  }

  cargarMedicos() {
    return this.http
      .get<cargarMedicos>(`${this.urlBase}/doctor/`, {
        headers: this.headers,
      })
      .pipe(
        delay(300),
        map((resp) => {
          const medicos = resp.medicos.map((medico) => {
            return new Medico(
              medico.name,
              medico._id,
              medico.img,
              medico.user,
              medico.hospital
            );
          });
          return medicos;
        })
      );
  }

  creacionMedico(name: string, hospital: string): Observable<createMedico> {
    const headers = this.headers;

    return this.http.post<createMedico>(
      `${this.urlBase}/doctor/create`,
      { name, hospital },
      {
        headers,
      }
    );
  }

  actualizarMedico(
    name: string,
    _id: string,
    hospital: string
  ): Observable<createMedico> {
    const headers = this.headers;

    return this.http.put<createMedico>(
      `${this.urlBase}/doctor/update${_id}`,
      { name, hospital },
      {
        headers,
      }
    );
  }

  eliminarMedico(_id: string): Observable<eliminarMedico> {
    const headers = this.headers;

    return this.http.delete<eliminarMedico>(
      `${this.urlBase}/doctor/delete${_id}`,
      {
        headers,
      }
    );
  }

  obtenerMedicoId(id: string) {
    return this.http
      .get<medicoID>(`${this.urlBase}/doctor/medico${id}`, {
        headers: this.headers,
      })
      .pipe(
        map(({ ok, medico }) => {
          return medico;
        }),
        catchError((error) => of(undefined))
      );
  }
}

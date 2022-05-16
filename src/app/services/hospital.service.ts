import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {
  cargarHospitales,
  createHospital,
} from '../interfaces/hospital.interfaces';
import { map, delay } from 'rxjs/operators';
import { Hospital } from '../models/hospitales.model';
import { eliminarHospital } from '../interfaces/hospital.interfaces';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  private urlBase: string = environment.urlBase;

  constructor(private http: HttpClient) {}

  get getToken(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return new HttpHeaders({
      'x-token': this.getToken,
    });
  }

  cargarHospitales() {
    const headers = this.headers;

    return this.http
      .get<cargarHospitales>(`${this.urlBase}/hospitals/`, {
        headers,
      })
      .pipe(
        delay(300),
        map((resp) => {
          const hospitales = resp.hospitales.map(
            (hospital) =>
              new Hospital(
                hospital.name,
                hospital._id,
                hospital.img,
                hospital.user
              )
          );
          return hospitales;
        })
      );
  }

  async cargarHospital() {
    const data = await fetch(`${this.urlBase}/hospitals/`, {
      method: 'GET',
      headers: {
        'x-token': this.getToken,
      },
    });

    const resp = await data.json();

    return resp;
  }

  creacionHospital(name: string): Observable<createHospital> {
    const headers = this.headers;

    return this.http.post<createHospital>(
      `${this.urlBase}/hospitals/create`,
      { name },
      {
        headers,
      }
    );
  }

  actualizarHospital(name: string, _id: string): Observable<createHospital> {
    const headers = this.headers;

    return this.http.put<createHospital>(
      `${this.urlBase}/hospitals/update${_id}`,
      { name },
      {
        headers,
      }
    );
  }

  eliminarHospital(_id: string): Observable<eliminarHospital> {
    const headers = this.headers;

    return this.http.delete<eliminarHospital>(
      `${this.urlBase}/hospitals/delete${_id}`,
      {
        headers,
      }
    );
  }
}

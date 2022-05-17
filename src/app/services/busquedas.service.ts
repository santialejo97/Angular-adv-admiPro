import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Busqueda, BusquedaTotal } from '../interfaces/busqueda.interfaces';
import { Usuario } from '../models/usuarios.model';
import { Hospital } from '../models/hospitales.model';
import { Medico } from '../models/medicos.model';

@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  private url: string = environment.urlBase;

  constructor(private http: HttpClient) {}

  get getToken(): string {
    return localStorage.getItem('token') || '';
  }

  transaformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
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
  }

  transaformarHospitales(resultados: any[]): Hospital[] {
    return resultados.map(
      (hospital: Hospital) =>
        new Hospital(hospital.name, hospital._id, hospital.img, hospital.user)
    );
  }

  transaformarMedicos(resultados: any[]): Medico[] {
    return resultados.map(
      (medico: Medico) =>
        new Medico(
          medico.name,
          medico._id,
          medico.img,
          medico.user,
          medico.hospital
        )
    );
  }

  buscador(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string = '') {
    const url = `${this.url}/search/collecion/${tipo}/${termino}`;
    const headers = new HttpHeaders({
      'x-token': this.getToken,
    });

    return this.http.get<Busqueda>(url, { headers }).pipe(
      map((resp) => {
        switch (tipo) {
          case 'usuarios':
            return this.transaformarUsuarios(resp.resultados);
            break;
          case 'hospitales':
            return this.transaformarHospitales(resp.resultados);
            break;
          case 'medicos':
            return this.transaformarMedicos(resp.resultados);
            break;

          default:
            return [];
        }
      })
    );
  }

  busquedaGlobal(termino: string) {
    const url = `${this.url}/search/${termino}`;
    const headers = new HttpHeaders({
      'x-token': this.getToken,
    });

    return this.http.get<BusquedaTotal>(url, { headers });
  }
}

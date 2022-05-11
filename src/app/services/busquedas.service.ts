import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Busqueda } from '../interfaces/busqueda.interfaces';
import { Usuario } from '../models/usuarios.model';

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

          default:
            return [];
        }
      })
    );
  }
}

import { Hospital } from '../models/hospitales.model';
import { Medico } from '../models/medicos.model';
import { Usuario } from '../models/usuarios.model';

export interface Busqueda {
  ok: boolean;
  resultados: any[];
}

export interface BusquedaTotal {
  ok: boolean;
  search: {
    users: Usuario[];
    doctors: Medico[];
    hospitals: Hospital[];
  };
  parametro: string;
}

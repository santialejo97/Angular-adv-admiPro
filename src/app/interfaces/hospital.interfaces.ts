import { Hospital } from '../models/hospitales.model';

export interface cargarHospitales {
  ok: boolean;
  hospitales: Hospital[];
}

export interface createHospital {
  ok: boolean;
  msg: string;
  hospitalDB: Hospital;
}

export interface eliminarHospital {
  ok: boolean;
  msg: string;
}

import { cargarHospitales } from './hospital.interfaces';
import { Medico } from '../models/medicos.model';
export interface userMedico {
  _id: string;
  name: string;
  img: string;
}

export interface hospitalMedico {
  _id: string;
  name: string;
  img: string;
}

export interface cargarMedicos {
  ok: boolean;
  medicos: Medico[];
}

export interface createMedico {
  ok: boolean;
  msg: string;
  doctorDB: Medico;
}

export interface eliminarMedico {
  ok: boolean;
  msg: string;
}

export interface medicoID {
  ok: boolean;
  medico: Medico;
  msg: string;
}

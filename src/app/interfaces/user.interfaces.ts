import { Usuario } from '../models/usuarios.model';

export interface User {
  email: string;
  google?: boolean;
  name: string;
  role: string;
  uid?: string;
  img?: string;
}

export interface update {
  ok: boolean;
  msg: string;
  userUpdate: User;
}

export interface CargarUsers {
  ok: string;
  total: number;
  uid: string;
  users: Usuario[];
}

export interface Users {
  total: number;
  usuarios: Usuario[];
}

export interface Delete {
  ok: boolean;
  msg: string;
  uid: string;
}

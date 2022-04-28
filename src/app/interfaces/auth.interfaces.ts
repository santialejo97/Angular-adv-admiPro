import { Usuario } from '../models/usuarios.model';

export interface AuthForm {
  email: string;
  password: string;
  remember?: boolean;
}

export interface respAuth {
  ok: boolean;
  msg?: string;
  tokenBack?: string;
  token?: string;
}

export interface Renovar {
  ok: boolean;
  token: string;
  user: Usuario;
}

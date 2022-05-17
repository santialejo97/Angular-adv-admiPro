import { Usuario } from '../models/usuarios.model';
import { Menu } from './sidebar.interfaces';

export interface AuthForm {
  email: string;
  password: string;
  remember?: boolean;
}

export interface respAuth {
  ok: boolean;
  menu: Menu;
  msg?: string;
  tokenBack?: string;
  token?: string;
}

export interface Renovar {
  ok: boolean;
  token: string;
  user: Usuario;
  menu: Menu;
}

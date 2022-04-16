import { User } from './user.interfaces';

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmar: string;
  terminos: boolean;
}

export interface respRegister {
  ok: boolean;
  user: User;
  token: string;
}

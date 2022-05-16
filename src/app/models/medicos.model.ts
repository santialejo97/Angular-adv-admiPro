import { userMedico, hospitalMedico } from '../interfaces/medico.interfaces';

export class Medico {
  constructor(
    public name: string,
    public _id?: string,
    public img?: string,
    public user?: userMedico,
    public hospital?: hospitalMedico
  ) {}
}

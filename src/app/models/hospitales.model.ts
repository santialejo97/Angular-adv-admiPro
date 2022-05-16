import { UserHospital } from '../interfaces/user.interfaces';

export class Hospital {
  constructor(
    public name: string,
    public _id?: string,
    public img?: string,
    public user?: UserHospital
  ) {}
}

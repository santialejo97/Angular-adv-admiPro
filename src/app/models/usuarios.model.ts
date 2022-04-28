import { environment } from '../../environments/environment';

export class Usuario {
  private urlBase = environment.urlBase;

  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public role?: string,
    public google?: boolean,
    public img?: string,
    public uid?: string
  ) {}

  get ImgUrl(): string {
    if (this.img?.includes('https')) {
      return this.img;
    }
    if (this.img) {
      return `${this.urlBase}/upload/usuarios/${this.img}`;
    }
    return `${this.urlBase}/upload/usuarios/no-images`;
  }

  get nameUser(): string {
    return this.name;
  }

  get uidUser(): string {
    return this.uid || '';
  }
}

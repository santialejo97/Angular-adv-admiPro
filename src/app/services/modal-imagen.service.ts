import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  public urlBase: string = environment.urlBase;
  private _mostrarModal: boolean = true;
  public tipo!: 'usuarios' | 'medicos' | 'hospitales';
  public id!: string;
  public img!: string;

  public cambioImagen: EventEmitter<string> = new EventEmitter<string>();

  get mostrarModal() {
    return this._mostrarModal;
  }

  abrilModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string = 'no-images'
  ) {
    this._mostrarModal = false;
    this.tipo = tipo;
    this.id = id;
    if (img?.includes('https')) {
      this.img = img;
    } else {
      this.img = `${this.urlBase}/upload/${tipo}/${img}`;
    }
  }

  cerrarModal() {
    this._mostrarModal = true;
  }

  constructor() {}
}

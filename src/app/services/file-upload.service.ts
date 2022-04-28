import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuarios.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  public baseUrl: string = environment.urlBase;

  constructor(private userServices: UserService) {}

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    try {
      const url = `${this.baseUrl}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);
      const data = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': this.userServices.getToken,
        },
        body: formData,
      });

      const resp = await data.json();

      if (resp.ok) {
        this.userServices.user.img = resp.nameFile;
        return resp.nameFile;
      } else {
        console.log(resp.msg);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

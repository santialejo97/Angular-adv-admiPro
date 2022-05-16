import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  private urlBase: string = environment.urlBase;
  transform(
    img: string = '',
    tipo: 'usuarios' | 'medicos' | 'hospitales'
  ): string {
    if (img?.includes('https')) {
      return img;
    }
    if (img) {
      return `${this.urlBase}/upload/${tipo}/${img}`;
    }
    return `${this.urlBase}/upload/${tipo}/no-images`;
  }
}

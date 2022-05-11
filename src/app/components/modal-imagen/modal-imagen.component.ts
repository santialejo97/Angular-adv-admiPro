import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuarios.model';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [],
})
export class ModalImagenComponent implements OnInit {
  public imgSubida!: File;
  public imgTemp!: any;

  constructor(
    public modal: ModalImagenService,
    private fileUpload: FileUploadService
  ) {}

  ngOnInit(): void {}

  cerrarModal() {
    this.imgTemp = null;
    this.modal.cerrarModal();
  }

  cambiarImagen(event: any) {
    this.imgSubida = event?.target?.files[0];
    if (!event?.target?.files[0]) {
      this.imgTemp = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event?.target?.files[0]);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirImagen() {
    const tipo = this.modal.tipo;
    this.fileUpload
      .actualizarFoto(this.imgSubida, tipo, this.modal.id || '')
      .then((img) => {
        Swal.fire(
          'Actualizacion de Avatar',
          'Imagen de avatar actualizada',
          'success'
        );
        this.modal.cambioImagen.emit(img);
        this.cerrarModal();
      })
      .catch(() => {
        Swal.fire(
          'Actualizacion de Avatar',
          'Error Actualizando imagen de avatar ',
          'error'
        );
      });
  }
}

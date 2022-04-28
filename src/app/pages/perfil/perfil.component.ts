import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuarios.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup;
  public user!: Usuario;
  public imgSubida!: File;
  public imgTemp!: any;

  constructor(
    private fb: FormBuilder,
    private userServices: UserService,
    private fileUpload: FileUploadService
  ) {
    this.user = userServices.user;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  update() {
    const data = this.perfilForm.value;
    this.userServices.update(data).subscribe(
      (resp) => {
        this.user.name = resp.userUpdate.name;
        this.user.email = resp.userUpdate.email;
        Swal.fire({
          title: 'Usuario Actualizado',
          text: resp.msg,
          icon: 'success',
          confirmButtonText: 'Back',
        });
      },
      ({ error }) => {
        Swal.fire({
          title: 'Error de Actualizacion',
          text: error.msg,
          icon: 'error',
          confirmButtonText: 'Back',
        });
      }
    );
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
    this.fileUpload
      .actualizarFoto(this.imgSubida, 'usuarios', this.user.uid || '')
      .then(() => {
        Swal.fire(
          'Actualizacion de Avatar',
          'Imagen de avatar actualizada',
          'success'
        );
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

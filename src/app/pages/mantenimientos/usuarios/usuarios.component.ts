import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from '../../../models/usuarios.model';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuario: number = 0;
  public usuarios!: Usuario[];
  public usuariosTemp!: Usuario[];
  public pageActual: number = 0;
  public cargando: boolean = true;
  public $imgSub!: Subscription;

  constructor(
    private userServices: UserService,
    private busquedaService: BusquedasService,
    private modal: ModalImagenService
  ) {}

  ngOnDestroy(): void {
    this.$imgSub.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.$imgSub = this.modal.cambioImagen
      .pipe(delay(500))
      .subscribe((img) => this.cargarUsuarios());
  }

  cargarUsuarios(valor: number = 0) {
    this.cargando = true;
    this.userServices.cargarUsuarios(valor).subscribe(({ usuarios, total }) => {
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.totalUsuario = total;
      this.cargando = false;
    });
  }

  paginador(boton: string) {
    if (boton == 'siguiente') {
      this.pageActual += 5;
      if (this.pageActual > this.totalUsuario) {
        this.pageActual -= 5;
      }
    } else if (boton == 'anterior') {
      this.pageActual -= 5;
      if (this.pageActual < 0) {
        this.pageActual = 0;
      }
    }
    this.cargarUsuarios(this.pageActual);
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.usuarios = [...this.usuariosTemp];
      return;
    }
    console.log(termino);
    this.busquedaService
      .buscador('usuarios', termino)
      .subscribe((resultado) => {
        this.usuarios = resultado;
      });
  }

  eliminarUsuario(user: Usuario) {
    if (user.uid === this.userServices.user.uid) {
      Swal.fire(
        'Usuario NO Valido para Borrar',
        `Este es el usuario de sesion ${this.userServices.user.name}`,
        'error'
      );
      return;
    }

    Swal.fire({
      title: 'Borrar este Usuario?',
      text: `Esta seguro de borrar ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, Borrar!',
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.userServices.eliminarUsuario(user).subscribe((resp) => {
            Swal.fire(
              'Usuario Borrado!',
              `${resp.msg}-${user.name}`,
              'success'
            );

            this.cargarUsuarios();
          });
        }
      })
      .catch((error) => {
        Swal.fire(
          'Error De Peticion',
          'Consulte con el administrador',
          'error'
        );
      });
  }

  cambiarRole(user: Usuario) {
    this.userServices.updateRole(user).subscribe((resp) => {});
  }

  abrilModal(user: Usuario) {
    this.modal.abrilModal('usuarios', user.uid || '', user.img);
  }
}

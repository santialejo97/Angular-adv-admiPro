import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from 'src/app/models/medicos.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos!: Medico[];
  public temMedicos!: Medico[];
  public cargando: boolean = true;
  public $imgSub!: Subscription;
  public vacio: boolean = false;

  constructor(
    private medico: MedicoService,
    private search: BusquedasService,
    private modal: ModalImagenService
  ) {}

  ngOnDestroy(): void {
    this.$imgSub.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.$imgSub = this.modal.cambioImagen
      .pipe(delay(500))
      .subscribe((img) => this.cargarMedicos());
  }

  cargarMedicos() {
    this.cargando = true;
    this.medico.cargarMedicos().subscribe((medicos) => {
      this.cargando = false;
      this.medicos = medicos;
      this.temMedicos = medicos;
    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.medicos = [...this.temMedicos];
      return;
    }
    this.search.buscador('medicos', termino).subscribe((medicosArray) => {
      if (medicosArray.length === 0) {
        this.vacio = true;
        return;
      }
      this.vacio = false;
      const medicos: any = medicosArray;
      this.medicos = medicos;
    });
  }

  abrilModal(medico: Medico) {
    const id: string = medico._id || '';
    this.modal.abrilModal('medicos', id, medico.img);
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: 'Borrar este Usuario?',
      text: `Esta seguro de borrar ${medico.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, Borrar!',
    }).then((result) => {
      if (result.isConfirmed) {
        const id = medico._id || '';
        this.medico.eliminarMedico(id).subscribe((resp) => {
          Swal.fire(
            'Usuario Borrado!',
            `${resp.msg}-${medico.name}`,
            'success'
          );

          this.cargarMedicos();
        });
      }
    });
  }
}

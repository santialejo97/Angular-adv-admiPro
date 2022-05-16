import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hospital } from 'src/app/models/hospitales.model';
import { HospitalService } from '../../../services/hospital.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales!: Hospital[];
  public cargando: boolean = true;
  public $imgSub!: Subscription;
  private tempHospirales: Hospital[] = [];

  constructor(
    private hospital: HospitalService,
    private modal: ModalImagenService,
    private buscar: BusquedasService
  ) {}

  ngOnDestroy(): void {
    this.$imgSub.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.$imgSub = this.modal.cambioImagen
      .pipe(delay(500))
      .subscribe((img) => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospital.cargarHospitales().subscribe((hospitales) => {
      this.hospitales = hospitales;
      this.tempHospirales = hospitales;
      this.cargando = false;
    });
  }

  actualizar(hospital: Hospital) {
    const id = hospital._id || '';
    this.hospital.actualizarHospital(hospital.name, id).subscribe((resp) => {
      Swal.fire('Hospital Actualizado', `${resp.msg}`, 'success');
    });
  }

  eliminar(hospital: Hospital) {
    const id = hospital._id || '';
    this.hospital.eliminarHospital(id).subscribe((resp) => {
      Swal.fire('Hospital Eliminado', `${resp.msg}`, 'success');
      this.cargarHospitales();
    });
  }

  async crear() {
    const { value: name = '' } = await Swal.fire<string>({
      title: 'Creacion de Hospital',
      input: 'text',
      inputLabel: 'Nombre del hospital ',
      inputPlaceholder: 'Crear Hospital ',
      showCancelButton: true,
    });

    if (name?.length > 0) {
      this.hospital
        .creacionHospital(`Hospital de ${name.trim()}`)
        .subscribe((resp) => {
          Swal.fire(` ${name} creado`);
          this.cargarHospitales();
        });
    }
  }

  abrilModal(hospital: Hospital) {
    const id = hospital._id || '';
    this.modal.abrilModal('hospitales', id, hospital.img);
  }

  buscador(termino: string = '') {
    if (termino.length == 0) {
      this.hospitales = [...this.tempHospirales];
      return;
    }

    this.buscar.buscador('hospitales', termino).subscribe((resultados) => {
      const hospitales: any = resultados;
      this.hospitales = hospitales;
    });
  }
}

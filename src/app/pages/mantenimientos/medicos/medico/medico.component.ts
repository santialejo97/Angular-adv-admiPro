import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../../services/hospital.service';
import { Hospital } from '../../../../models/hospitales.model';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';
import { Medico } from 'src/app/models/medicos.model';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicoform!: FormGroup;
  public hospitales!: Hospital[];
  public hospitalSeleccionado!: Hospital | undefined;
  public medicoSeleccionado!: Medico | undefined;
  public params!: string;

  constructor(
    private fb: FormBuilder,
    private hospital: HospitalService,
    private medico: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.cargarHospitales();
  }

  ngOnInit(): void {
    this.medicoform = this.fb.group({
      name: ['Santiago', Validators.required],
      hospital: ['', Validators.required],
    });

    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarMedico(id);
    });

    this.medicoform.get('hospital')?.valueChanges.subscribe((hospitalId) => {
      console.log(hospitalId);
      console.log(this.hospitales);

      this.hospitalSeleccionado = this.hospitales.find(
        (h) => h._id === hospitalId
      );
    });
  }

  cargarMedico(id: string) {
    if (id === 'nuevo') {
      return;
    } else {
      if (id.length > 24) {
        this.router.navigateByUrl(`pages/dashboard/medicos`);
        return;
      }
      this.medico
        .obtenerMedicoId(id)
        .pipe(delay(400))
        .subscribe((medico) => {
          if (!medico) {
            this.router.navigateByUrl(`pages/dashboard/medicos`);
            return;
          }
          const { name, hospital } = medico;

          this.medicoSeleccionado = medico;
          this.medicoform.setValue({ name: name, hospital: hospital?._id });
        });
    }
  }

  cargarHospitales() {
    // Solucion dos para el error de carga de imagen
    // this.hospital.cargarHospital().then((resp) => {
    //   this.hospitales = resp.hospitales;
    // });
    this.hospital.cargarHospitales().subscribe((hospitales) => {
      this.hospitales = hospitales;
    });
  }

  crearMedico() {
    const name = this.medicoform.get('name')?.value;
    const hospital = this.medicoform.get('hospital')?.value;

    if (this.medicoSeleccionado) {
      const id = this.medicoSeleccionado._id || '';
      this.medico.actualizarMedico(name, id, hospital).subscribe((resp) => {
        Swal.fire({
          title: 'Actialización de Medico',
          text: `${resp.msg}`,
          icon: 'success',
        });
      });
    } else {
      this.medico.creacionMedico(name, hospital).subscribe((resp) => {
        console.log(resp);
        Swal.fire({
          title: 'Creación de Medico',
          text: `${resp.msg}`,
          icon: 'success',
        });
        this.router.navigateByUrl(
          `pages/dashboard/medico/${resp.doctorDB._id}`
        );
      });
    }
  }
}

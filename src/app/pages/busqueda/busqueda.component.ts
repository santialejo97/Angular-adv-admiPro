import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospitales.model';
import { Medico } from 'src/app/models/medicos.model';
import { Usuario } from 'src/app/models/usuarios.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent implements OnInit {
  public usuarios!: Usuario[];
  public medicos!: Medico[];
  public hospitales!: Hospital[];

  public usuariosCarga: boolean = false;
  public medicosCarga: boolean = false;
  public hospitalesCarga: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private busqueda: BusquedasService,
    private Router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ termino }) => {
      this.busquedaGlobal(termino);
    });
  }

  busquedaGlobal(termino: string) {
    this.busqueda
      .busquedaGlobal(termino)
      .pipe(delay(300))
      .subscribe((resp) => {
        if (resp.search.users.length > 0) {
          this.usuarios = resp.search.users;
          this.usuariosCarga = true;
        } else {
          this.usuariosCarga = false;
        }
        if (resp.search.doctors.length > 0) {
          this.medicos = resp.search.doctors;
          this.medicosCarga = true;
        } else {
          this.medicosCarga = false;
        }
        if (resp.search.hospitals.length > 0) {
          this.hospitales = resp.search.hospitals;
          this.hospitalesCarga = true;
        } else {
          this.hospitalesCarga = false;
        }
      });
  }

  abrirMedico(medico: Medico) {
    this.Router.navigateByUrl(`pages/dashboard/medico/${medico._id}`);
  }
}

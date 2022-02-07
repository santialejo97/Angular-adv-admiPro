import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  @Input('progreso') progreso: number = 50;
  @Input('btn') btn: string = ' btn-primary';

  @Output('porcentaje') porcentaje: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.btn = `btn ${this.btn}`;
  }

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor >= 0) {
      this.porcentaje.emit(100);
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && valor <= 0) {
      this.porcentaje.emit(0);
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;
    this.porcentaje.emit(this.progreso);
  }

  onChanges(nuevoValor: number) {
    if (nuevoValor >= 100) {
      this.progreso = 100;
    }
    if (nuevoValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }

    this.porcentaje.emit(this.progreso);
  }
}

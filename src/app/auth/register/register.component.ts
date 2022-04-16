import { Component } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Observer } from 'rxjs';
import { Router } from '@angular/router';
import {
  RegisterForm,
  respRegister,
} from '../../interfaces/register.interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formSubmitted: boolean = false;
  public registerForm = this.fb.group(
    {
      name: [
        'Santiago Gaviria',
        [Validators.required, Validators.minLength(3)],
      ],
      email: ['correo@correo.com', [Validators.required, Validators.email]],
      password: ['12345', [Validators.required, Validators.minLength(8)]],
      confirmar: ['12345', [Validators.required, Validators.minLength(8)]],
      terminos: [true, [Validators.required]],
    },
    {
      validators: this.passwordIguales('password', 'confirmar'),
    } as AbstractControlOptions
  );

  constructor(
    private fb: FormBuilder,
    private userservices: UserService,
    private router: Router
  ) {}

  crearUsuario() {
    this.formSubmitted = true;
    const observer: Observer<respRegister> = {
      next: (resp) => {
        this.router.navigateByUrl('/pages/dashboard/dash');
      },
      error: (err) => {
        Swal.fire({
          title: 'Error De Registro',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Back',
        });
      },
      complete: () => {},
    };

    if (!this.registerForm.valid) {
      return;
    }
    this.userservices.createUser(this.registerForm.value).subscribe(observer);
  }

  campoNoValido(campo: string): boolean {
    return this.registerForm.get(campo)?.invalid && this.formSubmitted
      ? true
      : false;
  }

  terminos(): boolean {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted
      ? true
      : false;
  }

  contrasenasNoValidas(): boolean {
    const password1 = this.registerForm.get('password')?.value;
    const password2 = this.registerForm.get('confirmar')?.value;
    return password1 !== password2 && this.formSubmitted ? true : false;
  }

  passwordIguales(pass1Name: string, pass2Name: string) {
    return (formGruop: FormGroup) => {
      const pass1Control = formGruop.get(pass1Name);
      const pass2Control = formGruop.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        console.log('iguales');
        pass2Control?.setErrors(null);
        pass1Control?.setErrors(null);
      } else {
        console.log('NOiguales');
        pass2Control?.setErrors({
          noEsIgual: true,
        });
        pass1Control?.setErrors({
          noEsIgual: true,
        });
      }
    };
  }
}

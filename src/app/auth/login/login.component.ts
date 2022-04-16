import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observer } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthForm, respAuth } from '../../interfaces/auth.interfaces';
import Swal from 'sweetalert2';
import { async } from '@angular/core/testing';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public auth2: any;
  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(
    private router: Router,
    private userServices: UserService,
    private fb: FormBuilder,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    const observer: Observer<respAuth> = {
      next: (resp) => {
        console.log('Login 2');
        this.loginForm.get('remember')?.value
          ? localStorage.setItem('email', this.loginForm.get('email')?.value)
          : localStorage.removeItem('email');

        this.router.navigateByUrl('/pages/dashboard/dash');
      },
      error: (err) => {
        Swal.fire({
          title: 'Error De Login',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Back',
        });
      },
      complete: () => {},
    };

    this.userServices
      .loginUser(this.loginForm.value)
      .pipe(delay(1000))
      .subscribe(observer);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });
    this.startApp();
  }

  async startApp() {
    await this.userServices.googleInit().then((auth) => {
      this.auth2 = auth;
    });

    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element: any) {
    console.log(element.id);
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.loginGoogle(id_token);
      },
      (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }

  loginGoogle(token: string) {
    const observer: Observer<respAuth> = {
      next: (resp) => {
        this.loginForm.get('remember')?.value
          ? localStorage.setItem('email', this.loginForm.get('email')?.value)
          : localStorage.removeItem('email');
        this.ngZone.run(() => {
          this.router.navigateByUrl('/pages/dashboard/dash');
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Error De Login',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Back',
        });
      },
      complete: () => {},
    };

    this.userServices.loginGoogle(token).subscribe(observer);
  }
}

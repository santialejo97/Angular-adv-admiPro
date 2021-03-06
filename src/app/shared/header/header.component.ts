import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuarios.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  userModel!: Usuario;

  constructor(private user: UserService, private router: Router) {
    this.userModel = user.user;
  }

  ngOnInit(): void {}

  logout() {
    this.user.logout();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.router.navigateByUrl(`pages/dashboard/dash`);
      return;
    }
    this.router.navigateByUrl(`pages/dashboard/buscar/${termino}`);
  }
}

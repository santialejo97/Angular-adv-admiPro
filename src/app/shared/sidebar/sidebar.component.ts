import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SidebarService } from '../../services/sidebar.service';
import { Menu } from '../../interfaces/sidebar.interfaces';
import { Usuario } from 'src/app/models/usuarios.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  menuIteams: Menu[] = [];
  userModel!: Usuario;

  constructor(private sidebar: SidebarService, private user: UserService) {
    this.userModel = user.user;
  }

  ngOnInit(): void {
    this.menuIteams = this.sidebar.menu;
  }
}

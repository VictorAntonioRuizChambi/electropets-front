import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Menu } from 'src/app/_model/menu';
import { LoginService } from 'src/app/_service/login.service';
import { MenuService } from 'src/app/_service/menu.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  menus: Menu[];

  constructor(
    private router: Router,
    private menuService: MenuService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    const helper = new JwtHelperService();

    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    const decodeToken = helper.decodeToken(token);
    let user = decodeToken.user_name;

    this.menuService.listarPorUsuario(user).subscribe(data => this.menus = data);
    this.menuService.getMenuCambio().subscribe(data => this.menus = data);
  }

  cerrarSesion() {
    this.loginService.cerrarSesion();
  }
}

import { Component, OnInit } from '@angular/core';
import { TokenService } from 'services/token.service';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  toggleMenu: boolean = false;

  user: any;
  
  constructor(private tokenService: TokenService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
  }

  expirado() {
    this.tokenService.tokenExpired(this.tokenService.getToken());
  }

  onclickToggle() {
    let navMenu = <HTMLElement>document.getElementById('nav-menu');
    if (this.toggleMenu) {
      this.toggleMenu = false;
      navMenu.classList.remove('mostrar');
      navMenu.classList.add('fadeOut');
    } else {
      this.toggleMenu = true;
      navMenu.classList.add('mostrar');
    }
  }
  cerrarSesion() {
    this.authService.logout();
  }

}
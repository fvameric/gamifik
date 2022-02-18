import { Component, OnInit } from '@angular/core';
import { TokenService } from 'services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  toggleMenu: boolean = false;

  user: any;
  
  constructor(private tokenService: TokenService) {}

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
}
window.addEventListener('scroll', function () {
  let navMenu = <HTMLElement>document.getElementById('nav-menu');
  let header = <HTMLElement>document.getElementById('header');
  header.classList.toggle('sticky', window.scrollY > 0);
  if (window.scrollY > 0) {
    navMenu.classList.add('navMenuScroll');
  } else {
    navMenu.classList.remove('navMenuScroll');
  }
});
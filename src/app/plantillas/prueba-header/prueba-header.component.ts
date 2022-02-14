import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prueba-header',
  templateUrl: './prueba-header.component.html',
  styleUrls: ['./prueba-header.component.css'],
})
export class PruebaHeaderComponent implements OnInit {
  toggleMenu: boolean = false;

  constructor() {}

  ngOnInit(): void {}

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

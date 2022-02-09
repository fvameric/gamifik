import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prueba-header',
  templateUrl: './prueba-header.component.html',
  styleUrls: ['./prueba-header.component.css']
})
export class PruebaHeaderComponent implements OnInit {
  toggleMenu: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onclickToggle() {
    let navMenu = <HTMLElement>document.getElementById("nav-menu");
    if (this.toggleMenu) {
      this.toggleMenu = false;
      navMenu.style.display = "none";
    } else {
      this.toggleMenu = true;
      navMenu.style.display = "flex";
    }

  }
}

window.addEventListener("scroll", function () {
  let header = <HTMLElement>document.getElementById("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});
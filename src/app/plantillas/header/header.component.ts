import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
window.addEventListener("scroll", function () {
  let header = <HTMLElement>document.getElementById("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

// const navMenu = <HTMLElement> document.getElementById('nav-menu'),
// toggleMenu = <HTMLElement> document.getElementById('toggle-menu'),
// closeMenu = <HTMLElement> document.getElementById('close-menu');

// toggleMenu.addEventListener('click',()=>{
//   navMenu.classList.toggle('show');
// });
// closeMenu.addEventListener('click',()=>{
//   navMenu.classList.remove('show');
// });

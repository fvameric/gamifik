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
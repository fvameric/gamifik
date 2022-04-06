import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.css']
})
export class DarkModeComponent implements OnInit {
  theme: string = 'light-theme';
  mostrarSolVisual: boolean = true;
  mostrarLunaVisual: boolean = false;
  GuardarDatos: string = "";

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {

  }

  ngOnInit() {
    this.GuardarDatos = JSON.parse(localStorage.getItem('DarkMode') || '[]');
    if (this.GuardarDatos.length == 0) {
      this.guardarLocalStorage();
    } else {
      this.theme = this.GuardarDatos;
    }
    
    this.initializeTheme();
  }

  switchTheme(): void {


    this.document.body.classList.replace(
      this.theme,
      this.theme === 'light-theme'
        ? (this.theme = 'dark-theme')
        : (this.theme = 'light-theme')

    );
    document.getElementsByClassName('toggle')[0].classList.toggle('dark');
    document.getElementsByClassName('toggle')[0].classList.toggle('active');

    if (this.mostrarSolVisual == true) {
      this.mostrarSolVisual = false;
      this.mostrarLunaVisual = true;
    } else {
      this.mostrarSolVisual = true;
      this.mostrarLunaVisual = false;
    }
    this.guardarLocalStorage();

  }

  guardarLocalStorage() {
    localStorage.setItem('DarkMode', JSON.stringify(this.theme));
  }

  initializeTheme = (): void =>
    this.renderer.addClass(this.document.body, this.theme);
}
export type Theme = 'light-theme' | 'dark-theme';
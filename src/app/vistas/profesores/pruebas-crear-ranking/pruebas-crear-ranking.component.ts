import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pruebas-crear-ranking',
  templateUrl: './pruebas-crear-ranking.component.html',
  styleUrls: ['./pruebas-crear-ranking.component.css'],
})
export class PruebasCrearRankingComponent implements OnInit {

  nombre:string = '';


  constructor() {}

  ngOnInit(): void {}

  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];


  onSubmit(){
    
  }
}

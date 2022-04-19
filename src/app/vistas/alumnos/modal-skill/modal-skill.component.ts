import { Component, Input, OnInit } from '@angular/core';
import { TokenService } from 'services/token.service';

@Component({
  selector: 'app-modal-skill',
  templateUrl: './modal-skill.component.html',
  styleUrls: ['./modal-skill.component.css']
})
export class ModalSkillComponent implements OnInit {

  @Input() skillSelec: any;
  datosAlumno: any;
  puntosInput: number = 0;
  
  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.datosAlumno = this.tokenService.getUser();
    console.log(this.datosAlumno);
    
  }

  onSubmit() {
    console.log("le has dado: " + this.puntosInput + ' de ' + this.datosAlumno.puntos_semanales + ' en ' + this.skillSelec.nombre);
  }

}

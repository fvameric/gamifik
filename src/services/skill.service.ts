import { Injectable } from '@angular/core';
import { Skill } from 'app/interfaces/Skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  // como las skills sabemos que no van a cambiar
  // no las obtenemos de un servidor
  // guardamos una array con cada skill y cada imagen
  arrSkills: Skill[] = [
    {
      id_skill: 0,
      nombre: 'Responsabilidad',
      descripcion: 'Habilidad de lograr con calidad las tareas asignadas, en el lugar y el momento adecuados, con el objetivo de responder a nuestros compromisos y respetando las normas acordadas.',
      niveles: {
        lvl1: 1,
        img1: '../assets/SoftSkills/responsabilidad/responsabilidad1.png',
        lvl2: 2,
        img2: '../assets/SoftSkills/responsabilidad/responsabilidad2.png',
        lvl3: 3,
        img3: '../assets/SoftSkills/responsabilidad/responsabilidad3.png',
      }
    },
    {
      id_skill: 1,
      nombre: 'Cooperación',
      descripcion: 'Habilidad de interaccionar de forma constructiva y a partir de la escucha, con el objetivo de conseguir una meta común y consensuada.',
      niveles: {
        lvl1: 1,
        img1: '../assets/SoftSkills/cooperacion/cooperacion1.png',
        lvl2: 2,
        img2: '../assets/SoftSkills/cooperacion/cooperacion2.png',
        lvl3: 3,
        img3: '../assets/SoftSkills/cooperacion/cooperacion3.png',
      }
    },
    {
      id_skill: 2,
      nombre: 'Iniciativa',
      descripcion: 'Habilidad de emprender acciones e implicarse en las actividades, utilizando los recursos propios, y de saber cuándo pedir ayuda.',
      niveles: {
        lvl1: 1,
        img1: '../assets/SoftSkills/iniciativa/iniciativa1.png',
        lvl2: 2,
        img2: '../assets/SoftSkills/iniciativa/iniciativa2.png',
        lvl3: 3,
        img3: '../assets/SoftSkills/iniciativa/iniciativa3.png',
      }
    }
  ]

  constructor() { }

  // para obtener la array de skills
  getSkills() {
    return this.arrSkills;
  }
}

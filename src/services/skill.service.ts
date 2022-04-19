import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';

const URL_READ_SKILLS = 'http://localhost:8080/skills/datosSkills.php'; // read skills
const URL_READ_SKILL_LEVEL = 'http://localhost:8080/skills/datosSkillLevel.php'; // read skills levels

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }

  obtenerSkills() {
    return this.http.get(URL_READ_SKILLS);
  }

  obtenerSkillLevel(skill: any) {
    return this.http.get(URL_READ_SKILL_LEVEL + `?id=${skill.id_skill}`);
  }
}

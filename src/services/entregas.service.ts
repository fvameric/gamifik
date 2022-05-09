import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entrega } from '../app/interfaces/Entrega';

const URL_LOCALHOST = 'http://localhost:8888/';

@Injectable({
  providedIn: 'root'
})
export class EntregasService {

  constructor(private http: HttpClient) { }

  obtenerEntregas() {
    return this.http.get(this.concatUrl('rankings/entregas/datosEntrega.php'));
  }

  eliminarEntregas(entrega: any) {
    return this.http.post(this.concatUrl('rankings/entregas/eliminarEntrega.php'), JSON.stringify(entrega));
  }

  modificarEntrega(entrega: Entrega) {
    return this.http.post(this.concatUrl('rankings/entregas/modificarEntrega.php'), JSON.stringify(entrega));
  }

  insertarEntregaJoin(entrega: any) {
    console.log(entrega);

    return this.http.post(this.concatUrl('rankings/entregas/insertarEntregaJoin.php'), JSON.stringify(entrega));
  }

  validarNombreExistePractica(id_rank: number, nombrePractica: string) {
    return this.http.get(this.concatUrl('rankings/entregas/obtenerNombrePractica.php') + `?nom_practica=${nombrePractica}&id_rank=${id_rank}`
    );
  }

  // crear entrega
  insertarPractica(entrega: Entrega) {
    return this.http.post(this.concatUrl('rankings/entregas/insertarEntrega.php'), JSON.stringify(entrega));
  }

  // concatena la URL de localhost y la string que le pasemos
  concatUrl(urlStr: string) {
    return URL_LOCALHOST + urlStr;
  }
}

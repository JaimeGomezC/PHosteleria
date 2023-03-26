import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turnos } from '../interfaces/turnos';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  private apiURL='http://localhost/proyectohosteleria/backend/turnos.php';

  constructor(private http: HttpClient) {   }

  
  // getTurnos(){
  //     fetch(this.apiURL,{
  //       method: "POST",
  //     })
  //     .then(res=>res.json())
  //     .then(json=>{
  //       return json
  //     })

  // }
  

  
  borrar(id:number):void {
  }
}

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

  // getTurnos():Observable<Turnos[]>{
  //   return this.http.get<Turnos[]>(this.apiURL)
  // }
  // getTurnos(){
  //     fetch(this.apiURL,{
  //       method: "POST",
  //     })
  //     .then(res=>res.json())
  //     .then(json=>{
  //       return json
  //     })

  // }
  // private frase: Frase = { value: "", icon_url: "", id: "", url: "" };
  private frase: Turnos = {
  id:1,
    fecha:"",
    tipo:"",
    observaciones:"",
    n_plazas:2};
  private ChuckUrl = "https://api.chucknorris.io/jokes/random"; // URL to web api



  public getTurnos(): Observable<Turnos> {
    return this.http.get<Turnos>(this.ChuckUrl);
  }
  
  borrar(id:number):void {
  }
}

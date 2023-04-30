import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TurnosResponse } from '../interfaces/turnosResponse';
import { Response } from "../interfaces/response";
import { HttpClient,HttpHeaders,HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  // private apiURL='http://localhost/proyectohosteleria/backend/turnos.php';

  url:string="http://localhost:8000/api/"
  constructor(private http: HttpClient) {   }

  getAutorizacion(){
    let token:any = sessionStorage.getItem('token')  
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    return headers;
  }

  getTurnos():Observable<TurnosResponse[]>{
    let direccion=this.url+"turnos";
    const requestOptions = { headers: this.getAutorizacion()};
    // //buscando con parametros por get
    //  let params = new HttpParams().set('id', '1');
    //  const httpOptions = {
    //  };
    return this.http.get<TurnosResponse[]>(direccion,requestOptions)
  }
  getTurnosPublicados():Observable<any>{
    let direccion=this.url+"turnos/publicados";
    const requestOptions = { headers: this.getAutorizacion()};
    return this.http.get<any>(direccion,requestOptions)
  }

  borrar(item:any):Observable<TurnosResponse>{
    let direccion=this.url+"turnos/"+item;
     const requestOptions = { headers: this.getAutorizacion()};
    return this.http.delete<TurnosResponse>(direccion,requestOptions)
  }

  modificar(id:any,item:TurnosResponse):Observable<TurnosResponse>{
    let direccion=this.url+"turnos/"+id;
    const requestOptions = { headers: this.getAutorizacion()};
    return this.http.put<TurnosResponse>(direccion,item,requestOptions)
  }

  addTurnos(form:TurnosResponse):Observable<Response>{
    let direccion=this.url+"turnos";
    const requestOptions = { headers: this.getAutorizacion()};
    return this.http.post<Response>(direccion,form,requestOptions)
    }
}

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

  
  getTurnos():Observable<TurnosResponse[]>{
    let direccion=this.url+"turnos";
    let token:any = sessionStorage.getItem('token')
      
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      
    const requestOptions = { headers: headers };

    //buscando con parametros por get
     let params = new HttpParams().set('id', '1');
     const httpOptions = {
     };

    return this.http.get<TurnosResponse[]>(direccion,requestOptions)
  }

  borrar(item:any):Observable<TurnosResponse>{
    let direccion=this.url+"turnos/"+item;
    let token:any = sessionStorage.getItem('token')
      
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    //buscando con parametros por get
     let params = new HttpParams().set('', item);
     const httpOptions = {params
     };
     const requestOptions = { headers: headers};
    return this.http.delete<TurnosResponse>(direccion,requestOptions)
  }

  modificar(id:any,item:TurnosResponse):Observable<TurnosResponse>{
    let direccion=this.url+"turnos/"+id;
    let token:any = sessionStorage.getItem('token')
      
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    //buscando con parametros por get
     const requestOptions = { headers: headers};
    return this.http.put<TurnosResponse>(direccion,item,requestOptions)
  }

  addTurnos(form:TurnosResponse):Observable<Response>{
    let direccion=this.url+"turnos";
    let token:any = sessionStorage.getItem('token')   
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      
    const requestOptions = { headers: headers };
        return this.http.post<Response>(direccion,form,requestOptions)
    }
}

import { Injectable } from "@angular/core";
import { Login } from "../interfaces/login";
import { Response } from "../interfaces/response";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { TurnosResponse } from '../interfaces/turnosResponse';
import {HttpParams} from "@angular/common/http";

@Injectable({
    providedIn:'root'
})
export class ApiService{
    // url:string="http://localhost:80/proyectohosteleria/backend/"
    url:string="http://localhost:8000/api/"
    public isLoggedIn: boolean = false;

    constructor(private http:HttpClient){
    }

    autentificar(form:Login):Observable<Response>{
        let direccion=this.url+"login";
        this.isLoggedIn = true;
        return this.http.post<Response>(direccion,form)
    }
    login() {
      // Lógica para iniciar sesión
      this.isLoggedIn = true;
    }
  
    logout() {
      // Lógica para cerrar sesión
      this.isLoggedIn = false;
    }

    getTurnos():Observable<TurnosResponse>{
        let direccion=this.url+"turnos";
        let token:any = sessionStorage.getItem('token')
        console.log("aquuuuiiiiii eeeee"+token)
          
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          });
          
        const requestOptions = { headers: headers };

        //buscando con parametros por get
         let params = new HttpParams().set('id', '1');
         const httpOptions = {
         };

        return this.http.get<TurnosResponse>(direccion,requestOptions)
      }

      delTurnos():Observable<TurnosResponse>{
        let direccion=this.url+"turnos";
        let token:any = sessionStorage.getItem('token')
        console.log("aquuuuiiiiii eeeee"+token)
          
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          });
          
        const requestOptions = { headers: headers };

        //buscando con parametros por get
         let params = new HttpParams().set('id', '1');
         const httpOptions = {
         };

        return this.http.get<TurnosResponse>(direccion,requestOptions)
      }
}
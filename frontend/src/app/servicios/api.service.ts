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
    url:string="https://reservasieslaflota.es/api/public/index.php/api/"
    public logged: boolean = false;

    constructor(private http:HttpClient){
    }

    // autentificar(form:Login):Observable<Response>{
    //     let direccion=this.url+"login";
    //     return this.http.post<Response>(direccion,form)
    // }

    // cerrarSesion():Observable<TurnosResponse>{
    //   let direccion=this.url+"logout";
    //   let token:any = sessionStorage.getItem('token')
        
    //   const headers = new HttpHeaders({
    //       'Content-Accept': 'application/json',
    //       'Authorization': `Bearer ${token}`,
    //     });
        
    //   const requestOptions = { headers: headers };
    //   return this.http.post<TurnosResponse>(direccion,requestOptions)
    // }

    
      // public login() {
      //   // Lógica para iniciar sesión
      //   this.logged = true;
      // }
    
      
    
      // public isLoggedIn() {
      //   let tokenStr = sessionStorage.getItem('token');
      //   if(tokenStr==undefined || tokenStr=='' || tokenStr==null){
      //     return false;
      //   }else{
      //     return true;
      //   }
      // }
}
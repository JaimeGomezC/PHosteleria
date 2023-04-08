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
    url:string="http://localhost:80/proyectohosteleria/backend/"
    //url:string="http://localhost:8000/proyectohosteleria/backend-api/"

    constructor(private http:HttpClient){
    }

    autentificar(form:Login):Observable<Response>{
        let direccion=this.url+"auth.php";
        return this.http.post<Response>(direccion,form)
    }

    getTurnos():Observable<TurnosResponse>{
        let direccion=this.url+"turnos.php";
        let token:any = sessionStorage.getItem('token')
        console.log("aquuuuiiiiii"+token)
          
         //Post options pass it to HttpHeaders Class 
        
         const headers = new HttpHeaders()
         .set('content-type','application/json')
         .set('Access-Control-Allow-Origin', '*');  
       console.log(headers)

        //buscando con parametros por get
         let params = new HttpParams().set('id', '1');
         const httpOptions = {
            
         };

        //  return this._HttpClient.get(`${API_URL}/api/v1/data/logs`, { params: params })
        //  const options ={ params: new HttpParams().set('api-key', token) };

        return this.http.get<TurnosResponse>(direccion,httpOptions)
      }
}
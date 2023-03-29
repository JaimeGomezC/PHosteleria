import { Injectable } from "@angular/core";
import { Login } from "../interfaces/login";
import { Response } from "../interfaces/response";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { TurnosResponse } from '../interfaces/turnosResponse';

@Injectable({
    providedIn:'root'
})
export class ApiService{
    url:string="http://localhost:8084/proyectohosteleria/backend/"
    constructor(private http:HttpClient){
    }

    loginByEmail(form:Login):Observable<Response>{
        let direccion=this.url+"auth.php";
        return this.http.post<Response>(direccion,form)
    }

    getTurnos():Observable<TurnosResponse>{
        let direccion=this.url+"turnos.php";
        return this.http.get<TurnosResponse>(direccion)
      }
}
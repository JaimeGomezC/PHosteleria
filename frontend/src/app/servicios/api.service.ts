import { Injectable } from "@angular/core";
import { Login } from "../interfaces/login";
import { Response } from "../interfaces/response";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class ApiService{
    url:string="http://localhost/proyectohosteleria/backend/"
    constructor(private http:HttpClient){
    }

    loginByEmail(form:Login):Observable<Response>{
        let direccion=this.url+"auth.php";
        return this.http.post<Response>(direccion,form)
    }
    
}
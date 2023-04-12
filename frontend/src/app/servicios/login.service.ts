import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from "../interfaces/response";
import { Login } from "../interfaces/login";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private url:string="http://localhost:8000/api/"
  private logged: boolean = false;

  constructor(private http: HttpClient) {}

  public generarToken(loginData: Login):Observable<Response>{
    return this.http.post<Response>(`${this.url}login`,loginData);
  }

  public cerrarSesion(): any {
    let direccion=this.url+"logout";
    let token: any = sessionStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders({
      'Content-Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const requestOptions = { headers: headers };
    return this.http.post(`${this.url}logout`,requestOptions);
  }
  public login() {
    // Lógica para iniciar sesión
    this.logged = true;
  }

  public isLoggedIn() {
    let tokenStr = sessionStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }
}

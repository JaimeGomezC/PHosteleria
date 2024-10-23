import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from "../interfaces/response";
import { UsuarioResponse } from '../interfaces/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private url:string="https://reservasieslaflota.es/api/public/index.php/api/"
  private logged: boolean = false;

  constructor(private http: HttpClient) {}

  public generarToken(loginData: UsuarioResponse):Observable<Response>{
    return this.http.post<Response>(`${this.url}login`,loginData);
  }
  getAutorizacion(){
    let token:any = sessionStorage.getItem('token')  
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    return headers;
  }

  public cerrarSesion(): any {
    let direccion=this.url+"logout";
    const requestOptions = { headers: this.getAutorizacion()};
    return this.http.post(`${this.url}logout`,{}, requestOptions);
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

  getRegistros():Observable<UsuarioResponse[]>{
    const requestOptions = { headers: this.getAutorizacion()};
    return this.http.get<UsuarioResponse[]>(`${this.url}index`,requestOptions)
  }

  borrar(item:any):Observable<UsuarioResponse>{
     const requestOptions = { headers: this.getAutorizacion()};
    return this.http.delete<UsuarioResponse>(`${this.url}destroy/${item}`,requestOptions)
  }
  registrar(form:UsuarioResponse):Observable<UsuarioResponse>{
    const requestOptions = { headers: this.getAutorizacion()};
   return this.http.post<UsuarioResponse>(`${this.url}register`,form,requestOptions)
 }
 modificar(id:any,item:UsuarioResponse):Observable<UsuarioResponse>{
  let direccion=this.url+"update/"+id;
  const requestOptions = { headers: this.getAutorizacion()};
  return this.http.put<UsuarioResponse>(direccion,item,requestOptions)
}
}

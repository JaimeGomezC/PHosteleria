import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Almacen } from '../interfaces/almacen';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {
  private apiUrl:string="https://reservasieslaflota.es/api/public/index.php/api/almacenes";

  constructor(private http: HttpClient) { }

  getAutorizacion(){
    let token:any = sessionStorage.getItem('token')  
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    return headers;
  }

  getAlmacenes(): Observable<Almacen[]> {
    const requestOptions = { headers: this.getAutorizacion()};
    return this.http.get<Almacen[]>(this.apiUrl,requestOptions);
  }

  getAlmacen(id: number): Observable<Almacen> {
    const requestOptions = { headers: this.getAutorizacion()};
    return this.http.get<Almacen>(this.apiUrl,requestOptions);
  }

  createAlmacen(almacen: Almacen): Observable<Almacen> {
    const requestOptions = { headers: this.getAutorizacion()};
    return this.http.post<Almacen>(this.apiUrl, almacen,requestOptions);
  }

  updateAlmacen(id: number, almacen: Almacen): Observable<Almacen> {
    const requestOptions = { headers: this.getAutorizacion()};
    return this.http.put<Almacen>(this.apiUrl, almacen,requestOptions);
  }

  deleteAlmacen(id: number): Observable<void> {
    let direccion=this.apiUrl+"/"+id;
     const requestOptions = { headers: this.getAutorizacion()};
    return this.http.delete<void>(direccion,requestOptions);
  }
}

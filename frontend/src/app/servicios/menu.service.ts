import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuResponse } from '../interfaces/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'http://localhost:8000/api/menus'; // Reemplazar URL de la API

  constructor(private http: HttpClient) { }

  // Obtener todas las reservas
  getMenus(): Observable<MenuResponse[]> {
    let token:any = sessionStorage.getItem('token') 
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    const requestOptions = { headers: headers };
    return this.http.get<MenuResponse[]>(this.apiUrl,requestOptions);
  }

  // Crear una nueva reserva
  crearMenu(reserva: MenuResponse): Observable<MenuResponse> {
    let token:any = sessionStorage.getItem('token') 
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    const requestOptions = { headers: headers };
    return this.http.post<MenuResponse>(this.apiUrl, reserva,requestOptions);
  }

  // Obtener una reserva por su ID
  getMenu(id: number): Observable<MenuResponse> {
    let token:any = sessionStorage.getItem('token') 
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    const requestOptions = { headers: headers };
    return this.http.get<MenuResponse>(`${this.apiUrl}/${id}`,requestOptions);
  }

  // Actualizar una reserva por su ID
  actualizarMenu(id: number, reserva: MenuResponse): Observable<MenuResponse> {
    let token:any = sessionStorage.getItem('token') 
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    const requestOptions = { headers: headers };
    return this.http.put<MenuResponse>(`${this.apiUrl}/${id}`, reserva,requestOptions);
  }

  // Eliminar una reserva por su ID
  eliminar(id: number): Observable<MenuResponse> {
    let token:any = sessionStorage.getItem('token')      
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
     const requestOptions = { headers: headers};
    return this.http.delete<MenuResponse>(`${this.apiUrl}/${id}`,requestOptions);
  }

}

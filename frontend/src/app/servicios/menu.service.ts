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
  crearMenu(menuData: MenuResponse): Observable<any> {
    let token:any = sessionStorage.getItem('token') 
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    const requestOptions = { headers: headers };
    return this.http.post<MenuResponse>(this.apiUrl, menuData,requestOptions);
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
  uploadImage(file: File):Observable<any> {
    const formData = new FormData();
    let token:any = sessionStorage.getItem('token')      
    // let headers=new HttpHeaders().set('Content-Type','multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      });
     const requestOptions = { headers: headers};
    formData.append('imagen', file,file.name);
    formData.append('Content-Type','multipart/form-data');
    return this.http.post<any>(`${this.apiUrl}/upload-image`,formData,requestOptions);
  }

}

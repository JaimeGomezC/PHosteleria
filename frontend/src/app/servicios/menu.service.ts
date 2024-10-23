import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuResponse } from '../interfaces/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'https://reservasieslaflota.es/api/public/index.php/api/menus'; // Reemplazar URL de la API

  constructor(private http: HttpClient) { }

  getAutorizacion(){
    let token:any = sessionStorage.getItem('token')  
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    return headers;
  }
  // Obtener todas las reservas
  getMenus(): Observable<MenuResponse[]> {
    const requestOptions = { headers: this.getAutorizacion()};
    return this.http.get<MenuResponse[]>(this.apiUrl,requestOptions);
  }

  // Crear una nueva reserva
  crearMenu(menuData: MenuResponse): Observable<any> {
    const requestOptions = { headers: this.getAutorizacion()};
    return this.http.post<MenuResponse>(this.apiUrl, menuData,requestOptions);
  }

  // Obtener una reserva por su ID
  getMenu(id: number): Observable<MenuResponse> {
    const requestOptions = { headers: this.getAutorizacion()};
    return this.http.get<MenuResponse>(`${this.apiUrl}/${id}`,requestOptions);
  }

  // Actualizar una reserva por su ID
  actualizarMenu(id: number, reserva: MenuResponse): Observable<MenuResponse> {
    const requestOptions = { headers: this.getAutorizacion()};
    return this.http.put<MenuResponse>(`${this.apiUrl}/${id}`, reserva,requestOptions);
  }

  // Eliminar una reserva por su ID
  eliminar(id: number): Observable<MenuResponse> {
    const requestOptions = { headers: this.getAutorizacion()};
    return this.http.delete<MenuResponse>(`${this.apiUrl}/${id}`,requestOptions);
  }
  uploadImage(file: File):Observable<any> {
    const formData = new FormData();
    let token:any = sessionStorage.getItem('token')      
     const headers = new HttpHeaders({
      'enctype': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      });
     const requestOptions = { headers: headers};
    formData.append('imagen', file,file.name);
    formData.append('Content-Type','multipart/form-data');
    return this.http.post<any>(`${this.apiUrl}/upload-image`,formData,requestOptions);
  }
  deleteImage(imageName: string) {
    const url = `${this.apiUrl}/deleteImage`;
    let token:any = sessionStorage.getItem('token')      
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      const params = new HttpParams().set('imagen_menu', imageName);
      const requestOptions = { headers: headers, params: params };

    return this.http.delete(url, requestOptions);
  }

}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GaleriaResponse } from '../interfaces/galeria';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {
  //private apiUrl = 'http://localhost:8000/api/galeria'; // Reemplazar URL de la API
  private apiUrl = 'https://reservasieslaflota.es/api/public/index.php/api/galeria'; // Reemplazar URL de la API

  constructor(private http: HttpClient) { }

  // Obtener todas las fotos de la galeria
  getFotosGaleria(): Observable<GaleriaResponse[]> {
    let token:any = sessionStorage.getItem('token') 
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    const requestOptions = { headers: headers };
    return this.http.get<GaleriaResponse[]>(this.apiUrl,requestOptions);
  }
  searchByTipo(tipo: string): Observable<any> {
    const url = `${this.apiUrl}/search/${tipo}`;
    return this.http.get(url);
  }
  // Añadir una nueva foto
  añadirFoto(fotoData: GaleriaResponse): Observable<any> {
    let token:any = sessionStorage.getItem('token') 
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    const requestOptions = { headers: headers };
    return this.http.post<GaleriaResponse>(this.apiUrl, fotoData,requestOptions);
  }

    // Obtener una foto por su ID
    getFoto(id: number): Observable<GaleriaResponse> {
      let token:any = sessionStorage.getItem('token') 
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
      const requestOptions = { headers: headers };
      return this.http.get<GaleriaResponse>(`${this.apiUrl}/${id}`,requestOptions);
    }


  // Actualizar una foto por su ID
  actualizarFoto(id: number, foto: GaleriaResponse): Observable<GaleriaResponse> {
    let token:any = sessionStorage.getItem('token') 
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    const requestOptions = { headers: headers };
    return this.http.put<GaleriaResponse>(`${this.apiUrl}/${id}`, foto,requestOptions);
  }

  // Eliminar una foto por su ID
  eliminar(id: number): Observable<GaleriaResponse> {
    let token:any = sessionStorage.getItem('token')      
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      const requestOptions = { headers: headers};
    return this.http.delete<GaleriaResponse>(`${this.apiUrl}/${id}`,requestOptions);
  }

  uploadFoto(file: File):Observable<any> {
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
    return this.http.post<any>(`${this.apiUrl}/upload-foto`,formData,requestOptions);
  }
  deleteImage(fotoName: string) {
    const url = `${this.apiUrl}/deleteImage`;
    let token:any = sessionStorage.getItem('token')      
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      const params = new HttpParams().set('imagen_url', fotoName);
      const requestOptions = { headers: headers, params: params };

    return this.http.delete(url, requestOptions);
  } 

}

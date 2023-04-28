import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservaResponse } from '../interfaces/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:8000/api/reservas'; // Reemplazar con la URL de tu API

  constructor(private http: HttpClient) { }

  // Obtener todas las reservas
  getReservas(): Observable<ReservaResponse[]> {
    let token:any = sessionStorage.getItem('token')
      
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      
    const requestOptions = { headers: headers };
    return this.http.get<ReservaResponse[]>(this.apiUrl,requestOptions);
  }

  // Crear una nueva reserva
  crearReserva(reserva: ReservaResponse): Observable<ReservaResponse> {
    return this.http.post<ReservaResponse>(this.apiUrl, reserva);
  }

  // Obtener una reserva por su ID
  getReserva(id: number): Observable<ReservaResponse> {
    return this.http.get<ReservaResponse>(`${this.apiUrl}/${id}`);
  }

  // Actualizar una reserva por su ID
  actualizarReserva(id: number, reserva: ReservaResponse): Observable<ReservaResponse> {
    return this.http.put<ReservaResponse>(`${this.apiUrl}/${id}`, reserva);
  }

  // Eliminar una reserva por su ID
  eliminar(id: number): Observable<ReservaResponse> {
    let token:any = sessionStorage.getItem('token')
      
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

     const requestOptions = { headers: headers};
    return this.http.delete<ReservaResponse>(`${this.apiUrl}/${id}`,requestOptions);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservaResponse } from '../interfaces/reserva';
import { saveAs } from 'file-saver'

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:8000/api/reservas'; // Reemplazar con la URL de tu API

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
  getReservas(): Observable<ReservaResponse[]> {
    const requestOptions = { headers: this.getAutorizacion()};
    return this.http.get<ReservaResponse[]>(this.apiUrl,requestOptions);
  }

  // Crear una nueva reserva
  crearReserva(reserva: ReservaResponse): Observable<ReservaResponse> {
    return this.http.post<ReservaResponse>(this.apiUrl, reserva);
  }

  // Obtener una reserva por su ID
  getReserva(id: number): Observable<ReservaResponse[]> {
    return this.http.get<ReservaResponse[]>(`${this.apiUrl}/${id}`);
  }
  // Obtener una reserva por su ID_TURNO
  getReservaTurno(idTurno: number): Observable<ReservaResponse[]> {
    const requestOptions = { headers: this.getAutorizacion()};
    return this.http.get<ReservaResponse[]>(`${this.apiUrl}/turno/${idTurno}`,requestOptions);
  }

  // Actualizar una reserva por su ID
  actualizarReserva(id: number, reserva: ReservaResponse): Observable<ReservaResponse> {
    return this.http.put<ReservaResponse>(`${this.apiUrl}/${id}`, reserva);
  }

  // Eliminar una reserva por su ID
  eliminar(id: number): Observable<ReservaResponse> {
    const requestOptions = { headers: this.getAutorizacion()};
    return this.http.delete<ReservaResponse>(`${this.apiUrl}/${id}`,requestOptions);
  }

  // Eliminar una reserva por su ID
  calcularPlazasVacantes(idTurno: number): Observable<any> {
    return this.http.get<ReservaResponse>(`${this.apiUrl}/plazasVacantes/${idTurno}`);
  }
  exportReservas() {
    const requestOptions = {
      headers: this.getAutorizacion(),
      responseType: 'blob' as 'json' // Especifica el tipo de respuesta como blob
    };
    
    return this.http.get<any>(`${this.apiUrl}Export`, requestOptions).subscribe(response => {
      if (response instanceof Blob) {
        saveAs(response, 'reservas.xlsx');
      } else {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'reservas.xlsx');
      }
    });
  }
}

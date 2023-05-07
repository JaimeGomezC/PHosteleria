import { Injectable } from '@angular/core';
import { ClienteResponse } from '../interfaces/cliente';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservaResponse } from '../interfaces/reserva';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl:string="http://localhost:8000/api/clientes"
  private logged: boolean = false;

  constructor(private http: HttpClient) { }

  getAutorizacion(){
    let token:any = sessionStorage.getItem('token')  
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    return headers;
  }
  // Método para agregar un nuevo cliente
  agregarCliente(jsonParams: any): Observable<any> {
    const requestOptions = { headers: this.getAutorizacion()};
    const body =  jsonParams ;
    return this.http.post<ClienteResponse>('http://localhost:8000/api/reservas/cliente' , body,requestOptions);
  }

  // // Método para obtener todos los clientes
  getClientes(): Observable<ClienteResponse[]> {
    let token:any = sessionStorage.getItem('token')
      
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      
    const requestOptions = { headers: headers };
    return this.http.get<ClienteResponse[]>(this.apiUrl,requestOptions);
  }

  // // Método para obtener un cliente por su id
  getCliente(id: number): Observable<ClienteResponse> {
    let token:any = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
     const requestOptions = { headers: headers};
    return this.http.get<ClienteResponse>(`${this.apiUrl}/${id}`,requestOptions);
  }

  // // Método para actualizar un cliente
  actualizarCliente(id: number, cliente: ClienteResponse): Observable<ClienteResponse> {
    let token:any = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
     const requestOptions = { headers: headers};
    return this.http.put<ClienteResponse>(`${this.apiUrl}/${id}`, cliente,requestOptions);
  }

  // // Método para eliminar un cliente
  eliminarCliente(id: number): Observable<ClienteResponse> {
    let token:any = sessionStorage.getItem('token')
      
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

     const requestOptions = { headers: headers};
    return this.http.delete<ClienteResponse>(`${this.apiUrl}/${id}`,requestOptions);
  }
}

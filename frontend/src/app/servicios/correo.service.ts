import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CorreoService {
  private apiUrl = 'http://localhost:8000/api/correo';

  constructor(private http: HttpClient) { }

  enviarCorreo(to: string): Observable<any> {
    const body = {
      to: to
    };

    return this.http.post<any>(this.apiUrl, body);
  }
}

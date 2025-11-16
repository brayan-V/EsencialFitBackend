import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio para autenticar usuarios contra el backend.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api/auth';

  constructor(private http: HttpClient) {}

  login(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, datos);
  }
  /**
 * Servicio para registro de usuario EsencialFit
 */
register(datos: any): Observable<any> {
  // Asegúrate que la URL sea exactamente el endpoint del backend
  return this.http.post('http://localhost:4000/api/Usuarios', datos);
}
}


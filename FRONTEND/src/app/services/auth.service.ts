import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api/auth';

  constructor(private http: HttpClient) {}

  login(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, datos);
  }

  register(datos: any): Observable<any> {
    return this.http.post('http://localhost:4000/api/Usuarios', datos);
  }

  guardarCredenciales(token: string, usuario: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  obtenerUsuarioActual(): any {
    const usuarioJson = localStorage.getItem('usuario');
    return usuarioJson ? JSON.parse(usuarioJson) : null;
  }

  limpiarCredenciales() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
}

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {Footer} from '../components/footer/footer.component'
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, Footer],
  templateUrl: './app-layout.html',
  styleUrls: ['./app-layout.scss']
})
export class AppLayout {
  usuario: any = null;

  constructor(public router: Router) {
    const usuarioJson = localStorage.getItem('usuario');
    if (usuarioJson) {
      try {
        this.usuario = JSON.parse(usuarioJson);
      } catch (e) {
        // localStorage corrupto o valor malformado
        this.usuario = null;
        localStorage.removeItem('usuario');
      }
    } else {
      this.usuario = null;
    }
  }

  get autenticado(): boolean {
    return !!localStorage.getItem('token');
  }

  get nombre(): string {
    return this.usuario?.nombre || '';
  }

  get rol(): string {
    return this.usuario?.rol || '';
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.usuario = null;
    this.router.navigate(['/']);
  }
}

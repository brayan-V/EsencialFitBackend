import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente standalone para el dashboard principal.
 * Aquí puedes mostrar bienvenida, resumen o el CRUD de usuarios.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard { }

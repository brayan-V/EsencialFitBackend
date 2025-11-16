import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  tiposID = [
    "Cédula de Ciudadanía",
    "Pasaporte",
    "DNI",
    "Tarjeta de Identidadd",
    "Cédula de Extranjería",
    "Permiso por Protección Temporal"
  ];
  
  registerForm: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      tipoID: ['', Validators.required],
      numeroID: ['', [Validators.required, Validators.minLength(5)]],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: [''],
      contraseña: ['', Validators.required],
    });
  }

  get esEntrenador() {
    return this.registerForm.get('rol')?.value === 'entrenador';
  }

  onSubmit() {
  this.errorMsg = '';
  if (this.registerForm.invalid) return;
  const usuario = { ...this.registerForm.value };
  usuario.rol = 'cliente'; // Forza el rol siempre a "cliente"
  // Quita especialidad si no aplica (como ya hacías)
  delete usuario.especialidad;
  this.loading = true;
  this.authService.register(usuario).subscribe({
    next: () => {
      this.loading = false;
      this.router.navigate(['/login']);
    },
    error: (err) => {
      this.errorMsg = err.error?.mensaje || 'Error registrando usuario';
      this.loading = false;
    }
  });
  }
}

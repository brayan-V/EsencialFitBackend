import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
/**
 * Componente funcional para inicio de sesión.
 * Valida, envía los datos y maneja la respuesta del backend.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  loginForm: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required]
    });
  }

  // Envía los datos al backend cuando el formulario es válido
  onSubmit() {
    this.errorMsg = '';
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (resp) => {
        localStorage.setItem('token', resp.token);
        this.loading = false;
        // Redirecciona al dashboard tras login exitoso
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMsg = err.error?.mensaje || 'Error de autenticación';
        this.loading = false;
      }
    });
  }
}

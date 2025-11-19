import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {
  usuarios: any[] = [];
  usuarioActual: any = {};
  rol: string = '';
  mostrarTabla = false;
  mostrarFormEdicion = false;
  usuarioEnEdicion: any = {};
  nuevoUsuario: any = {};
  mostrarFormNuevoUsuario = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const usuarioJson = localStorage.getItem('usuario');
    if (usuarioJson) {
      this.usuarioActual = JSON.parse(usuarioJson);
      this.rol = this.usuarioActual.rol;
      if (this.rol === 'administrador') this.cargarUsuarios();
      else if (this.rol === 'entrenador') this.cargarClientes();
      else if (this.rol === 'cliente') this.cargarMiPerfil();
    }
  }

  cargarUsuarios() {
    this.http.get<any[]>('http://localhost:4000/api/usuarios', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    }).subscribe(data => this.usuarios = data);
  }

  cargarClientes() {
    this.http.get<any[]>('http://localhost:4000/api/usuarios', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    }).subscribe(data => {
      this.usuarios = data.filter(u => u.rol === 'cliente');
    });
  }

  cargarMiPerfil() {
    this.usuarioEnEdicion = { ...this.usuarioActual };
    if (!this.usuarioEnEdicion._id && this.usuarioEnEdicion.id) {
      this.usuarioEnEdicion._id = this.usuarioEnEdicion.id;
    }
    this.mostrarFormEdicion = true;
  }

  verUsuarios() {
    this.mostrarTabla = !this.mostrarTabla;
    this.mostrarFormEdicion = false;
  }

  abrirFormNuevoUsuario() {
    this.nuevoUsuario = {
      nombre: '',
      correo: '',
      telefono: '',
      contrasena: '',
      rol: 'cliente',
      tipoID: '',
      numeroID: ''
    };
    this.mostrarFormNuevoUsuario = true;
    this.mostrarFormEdicion = false;
    this.mostrarTabla = false;
  }

  cerrarFormNuevoUsuario() {
    this.mostrarFormNuevoUsuario = false;
  }

  // CREAR usuario - muestra alerta al finalizar
  guardarNuevoUsuario() {
    const body: any = {
      tipoID: this.nuevoUsuario.tipoID,
      numeroID: this.nuevoUsuario.numeroID,
      nombre: this.nuevoUsuario.nombre,
      correo: this.nuevoUsuario.correo,
      telefono: this.nuevoUsuario.telefono,
      rol: this.nuevoUsuario.rol
    };
    if (this.nuevoUsuario.contrasena && this.nuevoUsuario.contrasena.trim() !== '') {
      body['contraseña'] = this.nuevoUsuario.contrasena;
    }
    this.http.post('http://localhost:4000/api/usuarios', body, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    }).subscribe(() => {
      this.mostrarFormNuevoUsuario = false;
      this.cargarUsuarios();
      Swal.fire({
        icon: 'success',
        title: 'Usuario creado',
        text: 'El usuario se ha registrado correctamente.',
        confirmButtonColor: '#F96C4B'
      });
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear usuario',
        text: err?.error?.mensaje || 'Hubo un problema al registrar el usuario.',
        confirmButtonColor: '#E94B3C'
      });
    });
  }

  // EDITAR usuario - muestra alerta al finalizar
  editarUsuario(usuario: any) {
    this.usuarioEnEdicion = { ...usuario };
    if (!this.usuarioEnEdicion._id && this.usuarioEnEdicion.id) {
      this.usuarioEnEdicion._id = this.usuarioEnEdicion.id;
    }
    this.mostrarFormEdicion = true;
    this.mostrarTabla = false;
  }

  guardarEdicion() {
    let id = this.usuarioEnEdicion._id;
    if (!id && this.usuarioEnEdicion.id) id = this.usuarioEnEdicion.id;
    const body = { ...this.usuarioEnEdicion };

    // Mapear 'contrasena' del front a 'contraseña'
    if (body.contrasena && body.contrasena.trim() !== '') {
      body['contraseña'] = body.contrasena;
    }
    delete body.contrasena;
    delete body._id;

    this.http.put(`http://localhost:4000/api/usuarios/${id}`, body, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    }).subscribe(() => {
      this.mostrarFormEdicion = false;
      if(this.rol === 'administrador') this.cargarUsuarios();
      else if(this.rol === 'entrenador') this.cargarClientes();
      Swal.fire({
        icon: 'success',
        title: 'Usuario actualizado',
        text: 'Los datos del usuario se guardaron correctamente.',
        confirmButtonColor: '#F96C4B'
      });
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar usuario',
        text: err?.error?.mensaje || 'Hubo un problema al actualizar.',
        confirmButtonColor: '#E94B3C'
      });
    });
  }

  // ELIMINAR usuario - confirmación y alerta final
  eliminarUsuario(id: string) {
    Swal.fire({
      title: '¿Eliminar este usuario?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F96C4B',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:4000/api/usuarios/${id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }).subscribe(() => {
          this.cargarUsuarios();
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'Usuario eliminado exitosamente',
            confirmButtonColor: '#F96C4B'
          });
        }, (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err?.error?.mensaje || 'No se pudo eliminar el usuario.',
            confirmButtonColor: '#E94B3C'
          });
        });
      }
    });
  }
}

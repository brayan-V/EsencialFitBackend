// Importa Router de Express para crear un submódulo de rutas dedicado a usuarios
import { Router } from "express";
// Importa los controladores CRUD desde el controlador de usuario
import {
  crearUsuario,
  listarUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario
} from "../controllers/usuario.controller.js";
// Importa el middleware para verificar token JWT en rutas protegidas
import { verificarToken } from "../middlewares/verificarToken.js";

/**
 * Instancia un enrutador (Router) de Express, útil para modularizar rutas por recurso.
 * Este router gestiona todas las rutas relacionadas con la entidad Usuario y su ciclo CRUD.
 */
const router = Router();

/**
 * Define las rutas principales para el recurso 'usuarios':
 *
 *  POST   /api/usuarios        → crearUsuario      (registro de nuevo usuario cliente)
 *  GET    /api/usuarios        → listarUsuarios    (obtener todos los usuarios)
 *  GET    /api/usuarios/:id    → obtenerUsuario    (obtener un usuario por ID específico)
 *  PUT    /api/usuarios/:id    → actualizarUsuario (actualizar datos de usuario, requiere autenticación)
 *  DELETE /api/usuarios/:id    → eliminarUsuario   (eliminar usuario, requiere autenticación)
 *
 * Nota: Las rutas que requieren autenticación están protegidas con el middleware verificarToken.
 */
router.post("/", crearUsuario);
router.get("/", listarUsuarios);
router.get("/:id", obtenerUsuario);
router.put("/:id", verificarToken, actualizarUsuario);
router.delete("/:id", verificarToken, eliminarUsuario);

/**
 * Exporta el router para su inclusión en la aplicación principal, donde será montado bajo /api/usuarios.
 */
export default router;

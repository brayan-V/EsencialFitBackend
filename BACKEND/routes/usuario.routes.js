// routes/usuario.routes.js
import { Router } from "express";
import {
  crearUsuario,
  listarUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
  crearEntrenador
} from "../controllers/usuario.controller.js";
import { verificarToken } from "../middlewares/verificarToken.js";

/**
 * Instancia un enrutador (Router) de Express para la entidad Usuario.
 * Integra rutas especiales para las operaciones de admin y entrenadores.
 */
const router = Router();

/**
 * Rutas principales para el recurso 'usuarios'
 *
 * POST    /api/usuarios              → crearUsuario
 * POST    /api/usuarios/entrenador   → crearEntrenador (solo admin)
 * GET     /api/usuarios              → listarUsuarios (admin puede ver todos, entrenador solo clientes)
 * GET     /api/usuarios/:id          → obtenerUsuario
 * PUT     /api/usuarios/:id          → actualizarUsuario (requiere autenticación)
 * DELETE  /api/usuarios/:id          → eliminarUsuario (solo admin)
 */

// Ruta para registro cliente abierto
router.post("/", crearUsuario);
// Ruta para crear entrenador (solo admin autenticado)
router.post("/entrenador", verificarToken, crearEntrenador);
// Listar usuarios (verifica roles)
router.get("/", verificarToken, listarUsuarios);
router.get("/:id", verificarToken, obtenerUsuario);
router.put("/:id", verificarToken, actualizarUsuario);
// Eliminar usuarios (solo admin)
router.delete("/:id", verificarToken, eliminarUsuario);

export default router;

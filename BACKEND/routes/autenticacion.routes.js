// routes/autenticacion.routes.js
import { Router } from "express";
import { login } from "../controllers/autenticacion.controller.js";

/**
 * Instancia el Router de Express para rutas de autenticación.
 * Aquí se maneja solo el endpoint de login.
 */
const router = Router();

// Ruta POST /login: recibe correo y contraseña, responde con el token JWT si es exitoso
router.post("/login", login);

export default router;

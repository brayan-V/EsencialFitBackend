// Importamos Router para definir rutas de Express
import { Router } from "express";
// Importamos el modelo Usuario para interactuar con la base de datos
import Usuario from "../models/usuario.modelo.js";
// Importamos bcrypt para encriptar contraseñas en caso de actualización
import bcrypt from "bcrypt";
// Middleware para verificar token JWT en rutas protegidas
import { verificarToken } from "../middlewares/verificarToken.js";

const router = Router();

/**
 * Ruta POST /api/usuarios
 * Crear un nuevo usuario
 * Recibe nombre, correo y contraseña en el cuerpo de la petición.
 * Guarda el usuario en la base de datos con contraseña encriptada automáticamente.
 */
router.post("/", async (req, res) => {
    try {
        const { nombre, correo, contraseña } = req.body;
        const nuevoUsuario = new Usuario({ nombre, correo, contraseña });
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al crear usuario", error });
    }
});

/**
 * Ruta GET /api/usuarios
 * Devuelve la lista de todos los usuarios registrados en la base de datos.
 */
router.get("/", async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuarios", error });
    }
});

/**
 * Ruta GET /api/usuarios/:id
 * Obtiene un usuario específico buscando por su ID.
 * Retorna error 404 si no se encuentra.
 */
router.get("/:id", async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuario", error });
    }
});

/**
 * Ruta PUT /api/usuarios/:id
 * Actualiza los datos de un usuario específico (excepto contraseña que se encripta si es modificada).
 * Requiere un token JWT válido para autorización.
 */
router.put("/:id", verificarToken, async (req, res) => {
    try {
        if (req.body.contraseña) {
            // Si viene contraseña nueva, la ciframos antes de actualizar
            const salt = await bcrypt.genSalt(10);
            req.body.contraseña = await bcrypt.hash(req.body.contraseña, salt);
        }
        const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuarioActualizado) return res.status(404).json({ mensaje: "Usuario no encontrado" });
        res.json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

/**
 * Ruta DELETE /api/usuarios/:id
 * Elimina un usuario específico por ID.
 * Proteger con token JWT para evitar accesos no autorizados.
 */
router.delete("/:id", verificarToken, async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
        res.json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

export default router;

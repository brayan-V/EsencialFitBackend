// Importamos Router de Express para definir rutas modulares y separadas
import { Router } from "express";
// Importamos el modelo de Usuario para consultar la base de datos
import Usuario from "../models/usuario.modelo.js";
// Importamos jsonwebtoken para generar tokens JWT
import jwt from "jsonwebtoken";
// Importamos la clave secreta desde configuración para firmar el token
import { CLAVE_SECRETA_JWT } from "../configuracion.js";

// Creamos una instancia de Router para definir las rutas de autenticación
const router = Router();

/**
 * Ruta POST /login
 * Método para autenticar usuarios
 * Recibe correo y contraseña en el cuerpo de la petición.
 * Verifica que el usuario exista y que la contraseña sea válida.
 * Si es correcto, genera y devuelve un token JWT con duración 1 hora.
 */
router.post("/login", async (req, res) => {
    const { correo, contraseña } = req.body;

    // Busca en la base de datos un usuario con el correo proporcionado
    const usuario = await Usuario.findOne({ correo });
    // Si no existe, devuelve error 404
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    // Compara la contraseña recibida con la almacenada (hash) usando método del modelo
    const esValido = await usuario.compararContraseña(contraseña);
    // Si la contraseña no coincide, responde con error 401
    if (!esValido) return res.status(401).json({ mensaje: "Contraseña incorrecta" });

    // Genera un token firmado con el id del usuario y la clave secreta, que expira en 1 hora
    const token = jwt.sign({ id: usuario._id }, CLAVE_SECRETA_JWT, { expiresIn: "1h" });

    // Devuelve el token en la respuesta para uso en autenticación de rutas protegidas
    res.json({ token });
});

// Exporta el router para usarlo en app principal
export default router;

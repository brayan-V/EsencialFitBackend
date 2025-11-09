// Importa el modelo Usuario para consultar la base de datos de usuarios
import Usuario from "../models/usuario.modelo.js";
// Importa jsonwebtoken para generar y firmar tokens JWT
import jwt from "jsonwebtoken";
// Importa la clave secreta desde el archivo de configuración
import { CLAVE_SECRETA_JWT } from "../configuracion.js";

/**
 * Controlador para login/autenticación.
 * Recibe correo y contraseña en la solicitud.
 * Verifica que el usuario exista y la contraseña sea válida.
 * Si todo es correcto, genera y retorna un token JWT.
 *
 * @param {Object} req - Objeto de solicitud Express. Debe incluir correo y contraseña en req.body.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    // Busca en la base de datos un usuario con el correo proporcionado
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    // Verifica que la contraseña ingresada coincide con la guardada (encriptada)
    const esValido = await usuario.compararContraseña(contraseña);
    if (!esValido) return res.status(401).json({ mensaje: "Contraseña incorrecta" });

    // Si es válido, genera y retorna el token JWT con duración de 1 hora
    const token = jwt.sign({ id: usuario._id }, CLAVE_SECRETA_JWT, { expiresIn: "1h" });

    // Retorna el token para su uso en rutas protegidas
    res.json({ token });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en autenticación", error });
  }
};

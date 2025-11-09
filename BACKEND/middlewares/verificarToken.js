import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.modelo.js";
import { CLAVE_SECRETA_JWT } from "../configuracion.js";

/**
 * Middleware para validar token JWT y adjuntar usuario completo a la request
 * 
 * Extrae el token del header Authorization.
 * Valida y decodifica el token.
 * Recupera el usuario de la base de datos y lo adjunta a req.usuario.
 * Si el token es inválido o usuario no existe, devuelve error.
 */
export const verificarToken = async (req, res, next) => {
  // Extrae token del header 'Authorization' esperando formato 'Bearer <token>'
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).json({ mensaje: "Token requerido" });

  try {
    // Decodifica el token y obtiene el id del usuario
    const decodificado = jwt.verify(token, CLAVE_SECRETA_JWT);

    // Busca el usuario en la base de datos usando el id del token
    const usuario = await Usuario.findById(decodificado.id);
    if (!usuario) return res.status(401).json({ mensaje: "Token inválido o usuario no existe" });

    // Adjunta el usuario completo a la request para usarlo en siguientes middlewares o controladores
    req.usuario = usuario;

    // Continúa con la ejecución normal
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido" });
  }
};

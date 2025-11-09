// Importamos la librería jwt para manejar la verificación y decodificación de tokens JWT
import jwt from "jsonwebtoken";
// Importamos la clave secreta para verificar la firma del token desde el archivo de configuración
import { CLAVE_SECRETA_JWT } from "../configuracion.js";

/**
 * Middleware de Express para verificar tokens JWT en las peticiones protegidas.
 * Valida la autenticidad y vigencia del token recibido en el header 'Authorization'.
 * Si el token es válido, almacena el ID del usuario en req.idUsuario y permite continuar.
 * Si el token es inválido o no está presente, retorna error y bloquea el acceso.
 */
export const verificarToken = (req, res, next) => {
    // Extrae el token del header 'Authorization'. Se espera el formato 'Bearer <token>'
    const token = req.headers["authorization"]?.split(" ")[1];
    // Si no se recibe token, responde con error 403 (prohibido)
    if (!token) return res.status(403).json({ mensaje: "Token requerido" });

    try {
        // Verifica el token usando la clave secreta
        const decodificado = jwt.verify(token, CLAVE_SECRETA_JWT);
        // Guarda el id del usuario dentro del objeto req para uso posterior en la petición
        req.idUsuario = decodificado.id;
        // Si todo está correcto, continúa con el siguiente middleware o controlador
        next();
    } catch (error) {
        // Si ocurre error (token inválido, expirado, mal formado), responde con error 401 (no autorizado)
        return res.status(401).json({ mensaje: "Token inválido" });
    }
};

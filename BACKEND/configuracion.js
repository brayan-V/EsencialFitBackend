// Importamos dotenv para cargar las variables definidas en el archivo .env
import dotenv from "dotenv";
// Ejecutamos la configuración para cargar las variables en process.env
dotenv.config();

/**
 * Desestructuramos las variables de entorno necesarias para la aplicación
 * desde process.env, asignándoles valores por defecto en caso de que no estén definidas.
 *
 * Variables:
 * - PUERTO: Puerto donde correrá el servidor. Por defecto 3000.
 * - MONGODB_URI: Cadena de conexión a la base de datos MongoDB.
 * - CLAVE_SECRETA_JWT: Clave secreta para firmar y verificar tokens JWT.
 *
 * Se espera que estas variables estén definidas en un archivo .env en la raíz del proyecto.
 * Por ejemplo:
 * PUERTO=4000
 * MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/dbname
 * CLAVE_SECRETA_JWT=claveultrasecreta
 */
export const {
    PUERTO = 3000,
    MONGODB_URI = "mongodb://localhost:27017/esencialfit",
    CLAVE_SECRETA_JWT = "mi_clave_secreta"
} = process.env;

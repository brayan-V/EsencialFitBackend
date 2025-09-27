// Importa mongoose para interactuar con MongoDB
import mongoose from "mongoose";
// Importa la cadena de conexión desde el archivo de configuración
import { MONGODB_URI } from "./configuracion.js"; 

/**
 * Función asíncrona para conectar a la base de datos MongoDB usando Mongoose.
 * Intenta establecer la conexión mediante la URI configurada en las variables de entorno.
 * En caso de éxito, registra un mensaje en consola.
 * En caso de error, captura y muestra el mensaje de error para facilitar la depuración.
 */
export const conectarDB = async () => {
    try {
        // Establece la conexión con MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log("Conectado a MongoDB...");
    } catch (error) {
        // Muestra errores de conexión, si ocurren
        console.error("Error al conectar a MongoDB:", error.message);
    }
};

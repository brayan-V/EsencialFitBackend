// Importa mongoose para modelar documentos de MongoDB y bcrypt para encriptar contraseñas
import mongoose from "mongoose";
import bcrypt from "bcrypt";

/**
 * Esquema de Usuario para MongoDB usando Mongoose
 * Define la estructura de los documentos de usuarios dentro de la colección 'usuarios'.
 *
 * Campos:
 *  - nombre: Nombre completo del usuario (obligatorio)
 *  - correo: Dirección de correo única del usuario (obligatorio y único)
 *  - contraseña: Contraseña del usuario (obligatorio, se almacena encriptada)
 */
const UsuarioEsquema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
});

/**
 * Middleware de Mongoose que se ejecuta antes de guardar un usuario.
 * Si la contraseña fue modificada, se encripta antes de guardarse en la base de datos
 * para mayor seguridad.
 */
UsuarioEsquema.pre("save", async function (next) {
    // Solo encripta si la contraseña ha sido modificada o es nueva
    if (!this.isModified("contraseña")) return next();
    // Genera el "salt" y encripta la contraseña
    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
    next();
});

/**
 * Método de instancia para comparar contraseñas.
 * Permite verificar si la contraseña proporcionada por un usuario coincide
 * con la almacenada (después de encriptarse).
 *
 * @param {string} contraseña Contraseña a comparar
 * @returns {Promise<boolean>} Devuelve true si es correcta, false en caso contrario
 */
UsuarioEsquema.methods.compararContraseña = function (contraseña) {
    return bcrypt.compare(contraseña, this.contraseña);
};

/**
 * Exporta el modelo de Usuario basado en el esquema, lo que permite
 * interactuar con la colección 'usuarios' desde cualquier parte de la aplicación.
 */
export default mongoose.model("Usuario", UsuarioEsquema);

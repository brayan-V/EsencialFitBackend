// Importa mongoose para modelar documentos de MongoDB y bcrypt para encriptar contraseñas
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Definición de los tipos de documento válidos para identificación de usuarios
const tiposID = ["Cédula de Ciudadanía", "Pasaporte", "DNI","Tarjeta de Identidadd","Cédula de Extranjería","Permiso por Protección Temporal"];

/**
 * Esquema de Usuario para MongoDB usando Mongoose
 * Define la estructura y validaciones de los documentos de la colección 'usuarios'.
 *
 * Campos:
 *  - tipoID: Tipo de documento de identidad (opciones: "Cédula de Ciudadanía", "Pasaporte", "DNI","Tarjeta de Identidadd"), obligatorio.
 *  - numeroID: Número único del documento de identidad, obligatorio y único.
 *  - nombre: Nombre completo del usuario, obligatorio.
 *  - correo: Correo electrónico único y obligatorio.
 *  - telefono: Número de teléfono del usuario (opcional).
 *  - fechaRegistro: Fecha en que se creó el usuario, por defecto la fecha actual.
 *  - contraseña: Contraseña del usuario, obligatoria y almacenada encriptada con bcrypt.
 *  - rol: Rol del usuario dentro del sistema. Puede ser 'cliente', 'entrenador' o 'administrador'. Por defecto es 'cliente'.
 *  - especialidad: Área de especialización, solo se usa en usuarios con rol 'entrenador'.
 *  - adminAsignador: Referencia al usuario administrador que crea/asigna entrenadores (ObjectId de MongoDB).
 */
const UsuarioSchema = new mongoose.Schema({
  tipoID: { type: String, enum: tiposID, required: true },
  numeroID: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  telefono: String,
  fechaRegistro: { type: Date, default: Date.now },
  contraseña: { type: String, required: true },
  rol: { type: String, enum: ["cliente", "entrenador", "administrador"], default: "cliente" },
  especialidad: String,
  adminAsignador: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
});

/**
 * Middleware de Mongoose que se ejecuta antes de guardar un usuario.
 * Si la contraseña fue modificada, se encripta usando bcrypt antes de almacenarse en la base de datos.
 */
UsuarioSchema.pre("save", async function (next) {
  // Solo encripta si la contraseña ha sido modificada o es un usuario nuevo
  if (!this.isModified("contraseña")) return next();
  // Genera el "salt" y encripta la contraseña
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

/**
 * Método de instancia para comparar contraseñas.
 * Permite verificar si la contraseña proporcionada por un usuario coincide
 * con la almacenada (ya encriptada) en la base de datos.
 *
 * @param {string} contraseña Contraseña a comparar
 * @returns {Promise<boolean>} Devuelve true si es correcta, false en caso contrario
 */
UsuarioSchema.methods.compararContraseña = function (contraseña) {
  return bcrypt.compare(contraseña, this.contraseña);
};

/**
 * Exporta el modelo de Usuario basado en el esquema definido,
 * lo que permite interactuar con los documentos de la colección 'usuarios'
 * desde cualquier módulo de la aplicación.
 */
export default mongoose.model("Usuario", UsuarioSchema);


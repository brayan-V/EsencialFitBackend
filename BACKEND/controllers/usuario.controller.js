// Importa el modelo Usuario para interactuar con la colección 'usuarios' en la base de datos
import Usuario from "../models/usuario.modelo.js";
// Importa bcrypt para encriptar contraseñas nuevas cuando se actualizan datos de usuario
import bcrypt from "bcrypt";

/**
 * Controlador para crear un nuevo usuario tipo "cliente".
 * Recibe los datos en el cuerpo de la petición, crea un documento de usuario y lo guarda en la base de datos.
 * Por defecto, asigna el rol "cliente" a todos los registros realizados por el frontend abierto.
 *
 * @param {Object} req - El objeto de solicitud de Express, debe contener los datos del usuario en req.body
 * @param {Object} res - El objeto de respuesta de Express
 */
export const crearUsuario = async (req, res) => {
  try {
    const { tipoID, numeroID, nombre, correo, telefono, contraseña } = req.body;
    
    // Verifica campos obligatorios
    if (!tipoID || !numeroID || !nombre || !correo || !contraseña) {
      return res.status(400).json({ mensaje: "Todos los campos obligatorios deben estar completos" });
    }

    // Intenta crear nuevo usuario cliente
    const nuevoUsuario = new Usuario({
      tipoID,
      numeroID,
      nombre,
      correo,
      telefono,
      contraseña,
      rol: "cliente"
    });
    await nuevoUsuario.save();
    // Excluye la contraseña antes de devolver el usuario registrado
    const { contraseña: _, ...usuarioSinContraseña } = nuevoUsuario.toObject();
    res.status(201).json(usuarioSinContraseña);
  } catch (error) {
    // Verifica si el error es por clave única
    if (error.code === 11000) {
      return res.status(400).json({ mensaje: "Correo o número de documento ya registrado" });
    }
    res.status(400).json({ mensaje: "Error al crear usuario", error });
  }
};

/**
 * Controlador para listar todos los usuarios registrados en la base de datos.
 * Retorna un array de usuarios.
 *
 * @param {Object} req - El objeto de solicitud de Express
 * @param {Object} res - El objeto de respuesta de Express
 */
export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuarios", error });
  }
};

/**
 * Controlador para obtener un usuario específico por su ID.
 * Busca el usuario en la base de datos y lo devuelve; si no existe responde con error 404.
 *
 * @param {Object} req - El objeto de solicitud, req.params.id debe contener el ID del usuario
 * @param {Object} res - El objeto de respuesta de Express
 */
export const obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuario", error });
  }
};

/**
 * Controlador para actualizar los datos de un usuario específico.
 * Si se modifica la contraseña, se encripta antes de guardar los cambios.
 * Retorna los datos actualizados del usuario.
 *
 * @param {Object} req - El objeto de solicitud, req.params.id es el ID y req.body contiene campos a actualizar.
 * @param {Object} res - El objeto de respuesta de Express
 */
export const actualizarUsuario = async (req, res) => {
  try {
    // Si el cuerpo de la petición incluye una nueva contraseña, la encripta antes de actualizar
    if (req.body.contraseña) {
      const salt = await bcrypt.genSalt(10);
      req.body.contraseña = await bcrypt.hash(req.body.contraseña, salt);
    }
    const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuarioActualizado) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

/**
 * Controlador para eliminar un usuario específico por su ID.
 * Elimina el documento de usuario de la base de datos.
 *
 * @param {Object} req - El objeto de solicitud, req.params.id debe contener el ID del usuario a eliminar
 * @param {Object} res - El objeto de respuesta de Express
 */
export const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

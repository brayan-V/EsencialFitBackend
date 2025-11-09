// Importamos express para crear la aplicación web backend
import express from "express";
// Importamos cors para permitir peticiones desde diferentes orígenes (CORS)
import cors from "cors";
// Importamos la función para conectar a la base de datos MongoDB
import { conectarDB } from "./conexionDB.js";
// Importamos las rutas de usuarios para poder usarlas en nuestra app
import rutasUsuario from "./routes/usuario.routes.js";
// Importamos las rutas de autenticación (login) para la app
import rutasAuth from "./routes/autenticacion.routes.js";

// Creamos la instancia principal de Express que representa la aplicación
const app = express();

// Agregamos middleware para habilitar CORS (permite conexiones de otras fuentes)
app.use(cors());
// Middleware para poder interpretar datos JSON en el cuerpo de las peticiones
app.use(express.json());

// Definimos las rutas base para los usuarios y la autenticación
app.use("/api/usuarios", rutasUsuario);
app.use("/api/auth", rutasAuth);

// Conectamos a la base de datos MongoDB
conectarDB();

// Exportamos el objeto app para usarlo en el archivo que arranca el servidor
export default app;

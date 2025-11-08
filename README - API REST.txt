# Proyecto EsencialFit - API RESTful con Node.js, Express y MongoDB

## Descripción
API RESTful para gestión de usuarios y autenticación JWT. Permite intercambio de información en JSON y es testeable con Postman.

## Estructura del proyecto
- **middlewares/**: Middlewares de autenticación y seguridad.
- **models/**: Modelos Mongoose para la base de datos.
- **routes/**: Rutas para usuarios y autenticación.
- **configuracion.js**: Variables de entorno.
- **conexionDB.js**: Conexión a MongoDB.
- **app.js**: Configuración principal de Express.
- **servidor.js**: Arranque del servidor.

## Tecnologías
- Node.js, Express
- MongoDB con Mongoose
- JWT para autenticación
- bcrypt para cifrado de contraseñas
- dotenv para variables de entorno

## Instalación

1. Clona el repositorio. git clone https://github.com/brayan-V/EsencialFitBackend.git
2. Ejecuta `pnpm install`.
3. Copia `.env.example` a `.env` y rellena tus datos.
4. Ejecuta `pnpm start`.

## Ejemplo de archivo `.env.example`

Puerto donde corre el servidor
PUERTO=4000

URI de conexión a MongoDB Atlas o local
MONGODB_URI=mongodb+srv://usuario:contraseña@tu-cluster.mongodb.net/tu-bd?retryWrites=true&w=majority

Clave secreta para firmar tokens JWT (mantener secreta)
CLAVE_SECRETA_JWT=clave_ultra_segura

## Uso básico de autenticación con Postman

### Login
- **URL:** `POST http://localhost:4000/api/auth/login`
- **Body (JSON):**
{
"correo": "usuario@example.com",
"contraseña": "tu_contraseña"
}
- **Respuesta exitosa:**
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

### Uso del token para rutas protegidas:
En headers de las peticiones:
Authorization: Bearer <tu_token_aquí>

### Obtener usuarios (ejemplo)
- **URL:** `GET http://localhost:4000/api/usuarios`
- **Headers:**
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

¡Gracias por usar EsencialFit!




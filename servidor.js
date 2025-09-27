// Importamos la aplicación Express desde el módulo app.js
import app from "./app.js";
// Importamos el puerto configurado en variables de entorno o valor por defecto
import { PUERTO } from "./configuracion.js";

/**
 * Inicia el servidor web y pone la aplicación a escuchar en el puerto definido.
 * Cuando el servidor esté listo, imprime un mensaje en la consola indicando la URL de acceso.
 */
app.listen(PUERTO, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PUERTO}`);
});

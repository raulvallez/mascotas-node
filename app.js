import 'dotenv/config';
import dbClient from './config/dbClient.js'; // Importar la clase dbClient para conectar a la base de datos
import express from 'express';
import routesMascotas from './routes/mascotas.js'; // Importar las rutas de mascotas
import bodyParser from 'body-parser'; // Importar body-parser para parsear el cuerpo de las solicitudes


const app = express();

app.use(bodyParser.json()); // Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.urlencoded({ extended: true })); // Middleware para parsear el cuerpo de las solicitudes con URL-encoded

app.use('/mascotas', routesMascotas); // Usar las rutas de mascotas

try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log('🚀 Servidor escuchando en el puerto ' + PORT );
    });
} catch(e) {
    console.error('Error al iniciar el servidor:', e);
}

process.on('SIGINT', async () => { // Escuchar la señal SIGINT (Ctrl+C) para cerrar la conexión a la base de datos antes de salir
    console.log('Cerrando la aplicación...');
    await this.cerrarConexion();
    process.exit(0);
});
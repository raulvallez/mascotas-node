import 'dotenv/config'; // Importar las variables de entorno desde el archivo .env
import mongoose from 'mongoose';

class dbClient {
    constructor() {
        this.conectarBaseDatos(); // Llamar al método para conectar a la base de datos al crear una instancia de la clase
    }
    
    async conectarBaseDatos() {
        try { 
            console.log("Conectando con el servidor de base de datos...");
            const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/adopcion?retryWrites=true&w=majority`; // appName='adopcion' -> quitarlo, no sirve para mongoose.
            await mongoose.connect(queryString);
            console.log("MongoDB: Conexión establecida con el servidor de base de datos");
        } catch (error) {
            console.error('Error al conectar con la base de datos:', error);
            process.exit(1); // Salir del proceso con un código de error
        }
       
    }


    async cerrarConexion() {
        try {
            await mongoose.disconnect();
            console.log("Conexión cerrada con el servidor de base de datos");
        } catch (error) {
            console.error('Error al cerrar la conexión con la base de datos:', error);
        }
    }
}

export default new dbClient();
import 'dotenv/config'; // Importar las variables de entorno desde el archivo .env
import { MongoClient } from "mongodb";

class dbClient {
    constructor() {
        const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/`;
        this.client = new MongoClient(queryString);
        this.conectarBD();
    }

    async conectarBD() {
        try {
            await this.client.connect(); // Conectar al servidor de base de datos
            this.db = this.client.db('adopcion'); // Seleccionar la base de datos "adopcion"
            console.log("Conectado al servidor de base de datos");
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
        }
    }
}

export default new dbClient();
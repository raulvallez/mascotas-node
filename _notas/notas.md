# NODE MASCOTAS

# Video 1

node -v

npm -v

npm init -y 

npm i express

npm i body-parser

npm i dotenv

## Estructurando la API


creamos carpetas:

config
controllers
helpers
models
routes


a package.json
  "type": "module",


  creamos un archivo .env

```
PORT = 5000
```

En app.js

```
import express from 'express';
 
const app = express();

try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log('Servidor escuchando en el puerto ' + PORT );
    });
} catch(e) {
    console.error('Error al iniciar el servidor:', e);
}
```

## Rutas y controladores


En el fichero *routes/mascotas.js* añadios los POST, GET, UPDATE,...


En el fichero *controllers/mascotas.js* creamos la clase mascotasController

```
class mascotasController { 
    constructor() { 
    }

    async create(req, res)  { //puede tener  create(req, res, next). Es un método asíncrono
        try {
            res.status(201).json({ status: 'create-ok' });
        } catch (e) {
            res.status(500).send(e);
        }
    }

    async update(req, res) { 
        ...
    }

    ...
```


node app.js


instalamos *thunder client* de visual code para hacer peticiones


![Thunder](_notas/01-thunder.png)


Tenemos que decir que use el controlador para las rutas


```
import mascotasController from '../controllers/mascotas.js'; // Importar el controlador de mascotas

//post, get, put, delete
route.post('/', mascotasController.create);

route.get('/:id', mascotasController.getOne);
...

```



Crear la BBDD:

Crear proyecto
Crear cluster (nombre: adopción)

en CONNECT -> CHOOSE CONNECTION -Z> tenemos los distintos tipos de conexión, escogemos DRIVERS AND CLIENT LIBRARIES

mongodb+srv://raulvallez_db_user:<db_password>@adopcion.bkqjtba.mongodb.net/


## IMPLEMENTANDO CRUD



{
    "nombre": "Sirius",
    "tipo": "Gato",
    "raza": "Siames",
    "edad": 2
}


# Video 2: 

## Mongoose

web:  mongoosejs.com


npm install mongoose 




en config/dbClient.js


```
import 'dotenv/config'; // Importar las variables de entorno desde el archivo .env
import mongoose from 'mongoose';

class dbClient {
    constructor() {
        this.conectarBaseDatos(); // Llamar al método para conectar a la base de datos al crear una instancia de la clase
    }
    
    async conectarBaseDatos() {
        const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/`;
        await mongoose.connect(queryString);
        
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
```

## Definiendo el esquema


Crear carpeta /schema/mascotas.js

```
import mongoose from 'mongoose';

// Definir el esquema de la colección "mascotas"
//https://mongoosejs.com/docs/schematypes.html
const mascotasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    tipo: {
        type: String,
        require: true
    },
    raza: {
        type: String,
    },
    edad: {
        type: Number,
        require: true
    },
    descripcion: {
        type: String,
    },
    adoptado: {
        type: Boolean,
    } 
},{
    timestamps: true // Agrega automáticamente los campos createdAt y updatedAt
});

export default mongoose.model('mascotas', mascotasSchema); // Exportar el modelo de la colección "mascotas"
```

## Ajustando el modelo


```
import Mascota from '../schemas/mascotas.js';

class mascotasModel {

    async create(mascota) {
        console.log("👉 Datos que llegan al modelo:", mascota); 

        if (!mascota || typeof mascota !== 'object') {
            throw new Error("Los datos de la mascota son undefined, nulos o no son un objeto válido.");
        }

        return await Mascota.create(mascota);
    }

    async update(id, mascota) {
        console.log("👉 Datos que llegan al modelo:", id, mascota); 
        return await Mascota.findOneAndUpdate(id, mascota, {new: true});  //https://mongoosejs.com/docs/tutorials/findoneandupdate.html 
    }

    async delete(id) {
        console.log("👉 Datos que llegan al modelo:", id); 
        return await Mascota.findOneAndDelete(id); 
    } 

    async getAll() {
        console.log("👉 Datos getall"); 
        return await Mascota.find();  //find() devuelve todos los documentos de la colección
    }

    async getOne(id) {
        console.log("👉 Datos que llegan al modelo:", id);
        return await Mascota.findById(id);  //findById() busca un documento por su id
    }
}

export default new mascotasModel(); 
```

## Validando datos

Ajustamos config/dbClient.js

```
import 'dotenv/config'; // Importar las variables de entorno desde el archivo .env
import mongoose from 'mongoose';

class dbClient {
    constructor() {
        this.conectarBaseDatos(); // Llamar al método para conectar a la base de datos al crear una instancia de la clase
    }
    
    async conectarBaseDatos() {
        const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/adopcion?retryWrites=true&w=majority`; // appName='adopcion' -> quitarlo, no sirve para mongoose.
        await mongoose.connect(queryString);
        
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
```


al final de app.js:


```
...

process.on('SIGINT', async () => {
    await this.cerrarConexion();
    process.exit(0);
}
```
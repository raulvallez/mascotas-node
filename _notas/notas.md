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


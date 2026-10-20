import express from 'express';

// Rutas de mascotas, routador de express
const route = express.Router();

import mascotasController from '../controllers/mascotas.js'; // Importar el controlador de mascotas

//post, get, put, delete
route.post('/', mascotasController.create);

route.get('/:id', mascotasController.getOne);

route.get('/',mascotasController.getAll);

route.put('/:id', mascotasController.update);

route.delete('/:id', mascotasController.delete);

export default route;   //export default route; para poder importarlo en app.js y usarlo como middleware

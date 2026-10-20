import mascotasModel from "../models/mascotas.js";

class mascotasController { 
    constructor() { 
    }

    
    async create(req, res)  { //puede tener  create(req, res, next). Es un método asíncrono
        try {
            const data = mascotasModel.create(req.body); //req.body contiene los datos enviados en la solicitud POST
            res.status(201).json(data);
            
        } catch (e) {
            res.status(500).send(e);
        }
    }

    async update(req, res) { 
        try {
            const {id} = req.params; //desestructuración de req.params para obtener el id
            const data = mascotasModel.update(id,req.body); //req.body contiene los datos enviados en la solicitud POST
            res.status(200).json(data);
            console.log("status: 'update-ok'"); //console.log para ver el estado en la consola
        } catch (e) {
            res.status(500).send(e);
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params; //desestructuración de req.params para obtener el id
            const data = mascotasModel.delete(id); //req.body contiene los datos enviados en la solicitud POST
            res.status(206).json(data);
            console.log(" status: 'delete-ok' ");
        } catch (e) {
            res.status(500).send(e);
        }
    }

    async getAll(req, res) {
        try {
            const data = await mascotasModel.getAll(); //await para esperar a que se resuelva la promesa
            res.status(201).json(data);
            console.log("status: 'getall-ok'"); //console.log para ver el estado en la consola
        } catch (e) {
            res.status(500).send(e);
        }
    }

    async getOne(req, res) {
        try {
            //const data = await mascotasModel.getOne(req.params.id);  //req.params.id contiene el id enviado en la solicitud GET 
            
            //Otra opción de obtener el id:
            const {id} = req.params; //desestructuración de req.params para obtener el id
            console.log("👉 Datos que llegan al controlador:", id); //console.log para ver el id en la consola
            const data = await mascotasModel.getOne(id);
            console.log("👉 Datos que llegan al controlador (data):", data); //console.log para ver los datos en la consola
            res.status(201).json(data);
            console.log("status: 'getone-ok'"); //console.log para ver el estado en la consola
        } catch (e) {
            res.status(500).send(e);
        }
    }
}

export default new mascotasController();
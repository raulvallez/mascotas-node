import dbClient from "../config/dbClient.js";    
import { ObjectId } from 'mongodb';

class mascotasModel {

    async create(mascota) {
        console.log("👉 Datos que llegan al modelo:", mascota); 

        if (!mascota || typeof mascota !== 'object') {
            throw new Error("Los datos de la mascota son undefined, nulos o no son un objeto válido.");
        }

        const colMascotas = await dbClient.db.collection('mascotas');
        //mascota = { nombre: 'Firulais', especie: 'perro', edad: 3 }
        return await colMascotas.insertOne(mascota);
    }

    async update(id, mascota) {
        console.log("👉 Datos que llegan al modelo:", id, mascota); 
        const colMascotas = await dbClient.db.collection('mascotas');
        return await colMascotas.updateOne({ "_id": new ObjectId(id) }, { $set: mascota }); 
    }

    async delete(id) {
        console.log("👉 Datos que llegan al modelo:", id); 
        const colMascotas = await dbClient.db.collection('mascotas');
        return await colMascotas.deleteOne({ "_id": new ObjectId(id) });
    }

    async getAll() {
        console.log("👉 Datos getall"); 
        const colMascotas = await dbClient.db.collection('mascotas');
        return await colMascotas.find({}).toArray(); //find({}) devuelve todos los documentos de la colección y toArray() los convierte en un array
    }

    async getOne(id) {
        console.log("👉 Datos que llegan al modelo:", id);
        const colMascotas = await dbClient.db.collection('mascotas');
        console.log("👉 Datos que llegan al modelo (colMascotas):", colMascotas.dbName);
        return await colMascotas.findOne({ "_id": new ObjectId(id) }); //findOne({ _id: new ObjectId(id) }) devuelve el documento con el id especificado
    }
}

export default new mascotasModel(); 
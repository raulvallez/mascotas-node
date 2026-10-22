import Mascota from '../schemas/mascotas.js';
import mongoose from 'mongoose';


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
        return await Mascota.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, mascota, {new: true});  //https://mongoosejs.com/docs/tutorials/findoneandupdate.html 
    }

    async delete(id) {
        console.log("👉 Datos que llegan al modelo:", id); 
        return await Mascota.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)}); 
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
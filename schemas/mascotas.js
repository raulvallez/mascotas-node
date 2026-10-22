import mongoose from 'mongoose';

// Definir el esquema de la colección "mascotas"
//https://mongoosejs.com/docs/schematypes.html
const mascotasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['perro', 'gato', 'conejo', 'otro'],
    },
    raza: {
        type: String,
    },
    edad: {
        type: Number,
        required: true,
        min: [0, 'La edad mínima permitida es 0 años. La edad no puede ser negativa.'],
        max: [20, 'La edad máxima permitida es 20 años']
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
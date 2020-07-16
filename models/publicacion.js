const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definimos el esquema
var publicacionSchema = Schema({
    id_usuario: {type: mongoose.Types.ObjectId, ref: 'Usuario',required: true},
    id_categoria: {type: mongoose.Types.ObjectId, ref: 'Categoria'},
    tipo: {type: Number, required: true},
    titulo: {type: String, required: true},
    contenido: {type: String, required: true},
    precio: {type: Number},
    fecha_creacion: {type: Date, required: true},
    fecha_modificacion: {type: Date, required: true},
    is_active: {type: Number, required: true}

},{ autoCreate: true });

// Definimos el modelo
var Publicacion = mongoose.model("Publicacion", publicacionSchema)

// Exportamos
exports.Publicacion = Publicacion
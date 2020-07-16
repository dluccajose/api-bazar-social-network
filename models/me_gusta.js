const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definimos el esquema
var meGustaSchema = Schema({
    id_usuario: {type: mongoose.Types.ObjectId, ref: 'Usuario', required: true},
    tipo_contenido: {type: Number, required: true},
    ref_contenido: {type: mongoose.Types.ObjectId, required: true},
    fecha: {type: Date, required: true}
},{ autoCreate: true });

// Definimos el modelo
var MeGusta = mongoose.model("MeGusta", meGustaSchema)

// Exportamos
exports.MeGusta = MeGusta
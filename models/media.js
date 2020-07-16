const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definimos el esquema
var mediaSchema = Schema({
    file_path: {type: String, required: true},
    tipo: {type: Number, required: true}
},{ autoCreate: true });

// Definimos el modelo
var Media = mongoose.model("Media", mediaSchema)

// Exportamos
exports.Media = Media
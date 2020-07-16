const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definimos el esquema
var categoriaSchema = Schema({
    nombre: {type: String, required: true},
    tipo: {type: Number, required: true},
    file_path: {type: String, required: true}
},{ autoCreate: true });

// Definimos el modelo
var Categoria = mongoose.model("Categoria", categoriaSchema)

// Exportamos
exports.Categoria = Categoria
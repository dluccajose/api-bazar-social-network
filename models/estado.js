const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Esquema
var estadoSchema = new Schema({
    nombre: {type: String, max: 50, required: true}
},{ autoCreate: true });

// Modelo
var Estado = mongoose.model("Estado", estadoSchema)

// Exportamos el modelo
exports.Estado = Estado;

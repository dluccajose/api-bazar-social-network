const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definimos el esquema
var conversacionSchema = Schema({
    id_sender: {type: String, required: true},
    id_receiver: {type: String, required: true},
    fecha_ultimo: {type: Date, required: false},
    fecha_inicio: {type: Date, required: true, default: Date.now()}},{ autoCreate: true });


module.exports = mongoose.model('Conversacion', conversacionSchema)
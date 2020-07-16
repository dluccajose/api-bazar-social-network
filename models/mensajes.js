const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definimos el esquema
const mensajeSchema = Schema({
    
    id_usuario: {type: String, ref: 'Usuario', required: true},
    id_conversacion: {type: String, ref: 'Conversacion', required: true},
    contenido: {type: String, required: true},
    fecha: {type: Date, required: true, default: Date.now},
    is_readed: {type: Number, required: true, default: 0},
    created_at: {type: Date, default: Date.now}},{ autoCreate: true });

module.exports = mongoose.model('Mensajes', mensajeSchema)

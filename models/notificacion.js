const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definimos el esquema
var notificacionSchema = Schema({
    tipo_accion: {type: Number, required: true},
    tipo_contenido: {type: Number, required: true},
    ref_contenido: {type: mongoose.Types.ObjectId, required: true},
    id_sender: {type: mongoose.Types.ObjectId, ref: 'Usuario', required: true},
    id_receiver: {type: mongoose.Types.ObjectId, ref: 'Usuario', required: true},
    is_readed: {type: Number, required: true},
    fecha: {type: Date, required: true}
},{ autoCreate: true });

// Definimos el modelo
var Notificacion = mongoose.model("Notificacion", notificacionSchema)

// Exportamos
exports.Notificacion = Notificacion
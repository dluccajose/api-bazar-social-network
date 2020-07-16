const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definimos el esquema
var solicitudSchema = Schema({
    id_sender: {type: mongoose.Types.ObjectId, ref: 'Usuario', required: true},
    id_receiver: {type: mongoose.Types.ObjectId, ref: 'Usuario', required: true},
    status: {type: Number, required: true}
},{ autoCreate: true });

// Definimos el modelo
var Solicitud = mongoose.model("Solicitud", solicitudSchema)

// Exportamos
exports.Solicitud = Solicitud
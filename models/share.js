const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Esquema
var shareSchema = Schema({
   id_publicacion: {type: mongoose.Types.ObjectId, ref: 'Publicacion', required: true},
   id_usuario: {type: mongoose.Types.ObjectId, ref: 'Usuario', required: true},
   fecha: {type: Date, required: true}
},{ autoCreate: true });

// Modelo
var Share = mongoose.model("Share", shareSchema)

// Exportamos el modelo
exports.Share = Share;

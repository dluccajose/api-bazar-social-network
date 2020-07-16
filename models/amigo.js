const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definimos el esquema
var amigoSchema = Schema({
    id_sender: {type: mongoose.Types.ObjectId, ref: 'Usuario', required: true},
    id_receiver: {type: mongoose.Types.ObjectId, ref: 'Usuario', required: true}
},{ autoCreate: true });
 
// Definimos el modelo
var Amigo = mongoose.model("Amigo", amigoSchema)
// Exportamos
exports.Amigo = Amigo

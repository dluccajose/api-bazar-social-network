const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Estado = require('./estado').Estado;

// Definimos el esquema
var usuarioSchema = new Schema({
    email: {type: String, required: true, max: 50},
    password: {type: String, required: true},
    nombre: {type: String, required: true, max: 50},
    apellido: {type: String, required: true, max: 50},
    tipo: {type: Number, required: true},
    cedula: {type: String, required: true},
    profile_image: {type: String, required: true, default: "/media/avatars/default_avatar.jpg"},
    fecha_nac: {type: Date, required: true},
    fecha_registro: {type: Date, required: true},
    id_estado: {type: Schema.Types.ObjectId, ref: 'Estado', required: true},
    ciudad: {type: String, required: true},
    status: {type: Number, required: true}
},{ autoCreate: true });

// Definimos el modelo
var Usuario = mongoose.model("Usuario", usuarioSchema)
// Exportamos
exports.Usuario = Usuario

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definimos el esquema
var mediaPostSchema = Schema({
    id_media: {type: mongoose.Types.ObjectId, ref: 'Media', required: true},
    id_publicacion: {type: mongoose.Types.ObjectId, ref: 'Publicacion', required: true}
},{ autoCreate: true });

// Definimos el modelo
var MediaPost = mongoose.model("MediaPost", mediaPostSchema)

// Exportamos
exports.MediaPost = MediaPost
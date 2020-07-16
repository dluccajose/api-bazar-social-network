const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Categoria = mongoose.model('Categoria');

// Definimos el esquema
var followingCatSchema = Schema({
    id_user: {type: mongoose.Types.ObjectId, ref: 'Usuario', required: true},
    id_categoria: {type: mongoose.Types.ObjectId, ref: 'Categoria', required: true}
},{ autoCreate: true });

// Definimos el modelo
var followingCat = mongoose.model("FollowingCat", followingCatSchema)

// Exportamos
exports.followingCat = followingCat
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const comentarioSchema = Schema({
    id_comentario_respuesta: {type: mongoose.Types.ObjectId, ref: 'Comentario'},
    id_publicacion: {type: mongoose.Types.ObjectId, ref: 'Publicacion', required: true},
    id_usuario: {type: mongoose.Types.ObjectId, ref: 'Usuario',required: true},    
    comentario: {type: String, required: true}
},{ autoCreate: true });

module.exports = mongoose.model('Comentario', comentarioSchema)
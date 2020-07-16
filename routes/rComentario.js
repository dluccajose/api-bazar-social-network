

const express = require('express')
const rComentario = express.Router()
const CComentario = require('../controllers/cComentario')


rComentario.get("/comentario/:idComentario", CComentario.getComentario)
rComentario.post('/comentario', CComentario.guardarComentario )
rComentario.put('/comentario/:idComentario', CComentario.actualizarComentario)
rComentario.delete('/comentario/:idComentario', CComentario.eliminarComentario)


module.exports = rComentario
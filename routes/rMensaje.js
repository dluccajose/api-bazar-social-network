const express = require('express')
const rMensaje = express.Router()
const cMensaje = require('../controllers/cMensaje')
const isAuth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

rMensaje.get("/mensaje/:id",  cMensaje.getMensaje)
rMensaje.post('/mensaje',   cMensaje.guardarMensaje )
rMensaje.put('/mensaje/:idmensaje', cMensaje.actualizarMensaje)
rMensaje.delete('/mensaje/:idmensaje',  cMensaje.eliminarMensaje)
rMensaje.get('/mensajes/:idm', cMensaje.getMensajes)

module.exports = rMensaje


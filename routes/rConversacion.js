const express = require('express')
const rConversacion = express.Router()
const CConversacion = require('../controllers/cConversacion')
const isAuth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

rConversacion.get("/conversacion/:id",   CConversacion.getConversacion)
rConversacion.post('/conversacion',  isAuth,  CConversacion.guardarConversacion )
rConversacion.put('/conversacion/:idconversacion', isAuth, CConversacion.actualizarConversacion)
rConversacion.delete('/conversacion/:idconversacion', isAuth,  CConversacion.eliminarConversacion)
rConversacion.get('/conversaciones',  isAuth, CConversacion.getConversaciones)

module.exports = rConversacion

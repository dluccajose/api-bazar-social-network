const jwt = require('jwt-simple')
const config = require('../config')
const sTokens = require('../services/sTokens')
const moment = require('moment')
const Usuario = require('../models/usuario').Usuario


function isAuth(req, res, next) {

    // Comprobamos si existe la cabecera de autorizacion
    if(!req.headers.authorization) {
        return res.status(403).send({ message: 'No tienes autorizacion. Debes iniciar sesion'})
    }

    const token = req.headers.authorization.split(" ")[1]
    var payload = ''
    // Decodificamos y verificamos que el token sea valido
    try {
        payload = sTokens.decodeToken(token)
    } catch(error) {
        console.log(error.message)
        return res.status(400).send({ message: error.message})
    }
    
    if(payload.exp <= moment().unix()) {
        return res.status(401).send({ message: 'El token ha expirado'})
    }

    // Buscamos la informacion del usuario
    Usuario.findById(payload.userId, function(err, user) {
        req.userId = payload.userId                             // Guardamos el id
        req.userTipo = user.tipo 
        next()
    })
}

module.exports = isAuth
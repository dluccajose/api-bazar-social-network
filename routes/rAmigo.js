const Express = require('express')
const cAmigo = require('../controllers/cAmigo')
const isAuth = require('../middlewares/auth')

var router = Express.Router()

router.get("/amigos/:id", isAuth, cAmigo.consultarAmigos)
router.get("/amigo/:id", isAuth, cAmigo.verAmigo)
router.delete("/amigo/:id", isAuth, cAmigo.eliminarAmistad)
router.delete("/amigos/:id_receiver", isAuth, cAmigo.eliminarAmigo)

module.exports = router
const Express = require('express')
const cUsuario = require('../controllers/cUsuario')
const isAuth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

var router = Express.Router()

router.post("/usuario", cUsuario.registrarUsuario)
router.put("/usuario/foto", isAuth, cUsuario.cambiarFoto)
router.put("/usuario/modificar", isAuth, cUsuario.modificarUsuario)
router.put("/usuario/desactivar/:id", isAuth, isAdmin, cUsuario.desactivarUsuario)
router.put("/usuario/activar/:id", isAuth, isAdmin, cUsuario.activarUsuario)
router.post("/login", cUsuario.login)
router.get("/usuario/:id",  cUsuario.getUsuarioPublic)

module.exports = router
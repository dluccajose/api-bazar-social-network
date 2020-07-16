const Express = require('express')
const cEstado = require('../controllers/cEstado')
const isAuth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

var router = Express.Router()

router.post("/estado", isAuth, isAdmin, cEstado.agregarEstado)
router.put("/estado/:id", isAuth, isAdmin, cEstado.modificarEstado)
router.delete("/estado/:id", isAuth, isAdmin, cEstado.eliminarEstado)
router.get("/estado/:id", isAuth, isAdmin, cEstado.getEstado)
router.get("/estados", cEstado.getAllEstados)

module.exports = router
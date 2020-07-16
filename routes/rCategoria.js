const Express = require('express')
const cCategoria = require('../controllers/cCategoria')
const isAuth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

var router = Express.Router()

router.post("/categoria",isAuth, isAdmin, cCategoria.agregarCategoria)
router.put("/categoria/:id", isAuth, isAdmin, cCategoria.modificarCategoria)
router.delete("/categoria/:id", isAuth, isAdmin, cCategoria.eliminarCategoria)
//no se si se necesita estar logueado para verla, al igual q ser admin
router.get("/categoria/:id", /*isAuth, */cCategoria.getCategoria)
//no se si se necesita estar logueado para verlas, al igual q ser admin
router.get("/categorias", cCategoria.getAllCategorias)
router.get("/categorias/s/", isAuth, cCategoria.getCategoriasSeguidas)
router.get("/categorias/:idUsuario", /*isAuth,*/ cCategoria.getAllCategoriasLogin)

module.exports = router
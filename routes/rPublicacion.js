const Express = require('express')
const cPublicacion = require('../controllers/cPublicacion')
const isAuth = require('../middlewares/auth')

var router = Express.Router()

router.post("/publicacion", isAuth, cPublicacion.nuevaPublicacion)
router.get("/publicacion/:id", cPublicacion.getPublicacion)
router.put("/publicacion/desactivar/:id", isAuth, cPublicacion.desactivarPublicacion)
router.delete("/publicacion/:id", isAuth, cPublicacion.eliminarPublicacion)
router.put("/publicacion/:id", isAuth, cPublicacion.modificarPublicacion)
router.get("/publicaciones/ultimas/:from/:to", cPublicacion.ultimasPublicacionesHome)
router.get("/publicaciones/:id/:from/:to", cPublicacion.ultimasPublicacionesUser)
router.get("/publicaciones/:id/:from/:to/:show", cPublicacion.ultimasPublicacionesUser)
router.get("/timeline/:from/:to", isAuth, cPublicacion.timelineHome)
router.get("/publicaciones/v2/cat/:idCategoria/:from/:to", cPublicacion.publicacionesPorCategoria)
router.get("/buscar/publicacion/:query/:inicio/:final", cPublicacion.buscarPublicacion)
router.put("/publicacion/activar/:id", isAuth, cPublicacion.activarPublicacion)

module.exports = router


const Express = require('express')
const cSolicitud = require('../controllers/cSolicitud')
const isAuth = require('../middlewares/auth')

var router = Express.Router()

router.post("/solicitud", isAuth, cSolicitud.enviarSolicitud)
router.delete("/solicitud/:id", isAuth,  cSolicitud.eliminarSolicitud)
router.get("/solicitudes", isAuth, cSolicitud.consultarSolicitudes)
router.put("/solicitud/a/:id", cSolicitud.aceptarSolicitud)
router.put("/solicitud/r/:id", cSolicitud.rechazarSolicitud)
router.get("/buscaUsuarios", cSolicitud.buscador) 
router.get("/usuarios",cSolicitud.buscador)
router.get("/solicitudes2/:id_sender/:id_receiver",/* isAuth,*/ cSolicitud.consultarSolicitudes2)

module.exports = router
